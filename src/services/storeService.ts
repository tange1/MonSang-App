import { AllergyIntoleranceSeverity, Patient, Organization, Reference } from '@i4mi/fhir_r4';
import {
  AllergyIntoleranceEpisodeParams,
  AllergySystemCodeExtension,
  CHAllergyIntolerance,
  FhirUtils
} from '@i4mi/mhealth-proto-components';
import { APP_LANGUAGES } from 'src/boot/i18n';
import {
  DashboardComponent,
  DiaryEntry,
  LoginType,
  Settings,
  SymptomIntensity
} from 'src/model/interfaces';

/**
 * storeService.ts
 *
 * Provides functions to access web storage, default settings, locale, mockup patients, etc.
 */

const STORAGE_KEY = 'EPD_USE_CASES_PT2';
const USER_DATA_KEY = 'EPD_USE_CASES_PT2_USER_DATA';

export interface UserData {
  user: string;
  diaryEntries: DiaryEntry[];
  suspectedAllergies: AllergySystemCodeExtension[];
  settings: Settings;
}
interface LocalStoreObject {
  patient: Patient;
  oids: Oids;
  knownAllergies: CHAllergyIntolerance[];
}

interface SessionStoreObject {
  user: LoginType | undefined;
}

export interface Oids {
  eprSpid: string;
  mpiId: string;
  local: string;
  ahv: string;
  app: string;
}

export default class Store {
  private fhirUtils: FhirUtils;
  private user: LoginType | undefined;
  private patient: Patient = {resourceType: 'Patient'};
  private settings = this.getDefaultSettings();
  private oids = this.getDefaultOids();
  private diaryEntries = new Array<DiaryEntry>();
  private knownAllergies = new Array<CHAllergyIntolerance>();
  private suspectedAllergies = new Array<AllergySystemCodeExtension>();

  constructor(_fhirUtils: FhirUtils) {
    this.fhirUtils = _fhirUtils;
    this.restoreFromStorage();
  }

  /**
   * Restores data from sessionStorage.
   */
  private restoreFromStorage(): void {
    const session = sessionStorage.getItem(STORAGE_KEY);
    const local = localStorage.getItem(STORAGE_KEY);
    if (session) {
      const storage = JSON.parse(session) as SessionStoreObject;
      this.user = storage.user;
      this.restoreUserData();
    }
    if (local) {
      const storage = JSON.parse(local) as LocalStoreObject;
      this.patient = storage.patient;
      this.oids = storage.oids ?? this.getDefaultOids();
      this.knownAllergies = storage.knownAllergies ?? [];
    }
  }

  private restoreUserData(): void {
    const local = localStorage.getItem(USER_DATA_KEY);
    if (local) {
      const usersData = JSON.parse(local) as UserData[];
      const userData = usersData.find(
        (data) => data.user === this.user?.username
      );
      this.diaryEntries =
        userData?.diaryEntries.map((e) => {
          return {
            date: new Date(e.date),
            symptoms: e.symptoms,
            note: e.note,
            allergy: e.allergy
          };
        }) ?? [];
      this.suspectedAllergies = userData?.suspectedAllergies ?? [];
      this.settings = userData?.settings ?? this.getDefaultSettings();
    }
  }

  /**
   * Persists the content of the store to sessionStorage.
   */
  private persistToStorage(): void {
    if (!this.user || !this.user.username) {
      throw new Error("Can't store without user");
    }
    const userData = JSON.parse(
      localStorage.getItem(USER_DATA_KEY) ?? '[]'
    ) as UserData[];

    const localData: UserData = {
      user: this.user.username || '',
      diaryEntries: this.diaryEntries,
      suspectedAllergies: this.suspectedAllergies,
      settings: this.settings
    };

    const index = userData.findIndex(
      (data) => data.user === this.user?.username ?? ''
    );

    if (index === -1) {
      userData.push(localData);
    } else {
      userData[index] = localData;
    }
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: this.user
      })
    );
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        patient: this.patient,
        oids: this.oids,
        knownAllergies: this.knownAllergies
      })
    );
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }

  /**
   * @returns  Logged in user as LoginType or undefined if
   *           no user is stored as logged in.
   */
  getUser(): LoginType | undefined {
    return this.user;
  }

  /**
   * @param _user LoginType object of user that is logged in.
   */
  setUser(_user: LoginType): void {
    this.user = _user;
    this.restoreUserData();
    this.persistToStorage();
  }

  /**
   * Adds a new diary entry to the diary.
   * @param _entry  A diary entry object to add
   * @returns       The new diary with all entries
   */
  addDiaryEntry(_entry: DiaryEntry): DiaryEntry[] {
    this.diaryEntries.push(_entry);
    this.diaryEntries.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    this.persistToStorage();
    return this.getDiary();
  }

  /**
   * Gets the diary entries, sorted by date (ascending).
   * @returns The diary with all entries
   */
  getDiary(): DiaryEntry[] {
    return this.diaryEntries;
  }

  /**
   * Sets the diary with an array of entries.
   * @param _diary The diary with all entries
   */
  setDiary(_diary: DiaryEntry[]) {
    this.diaryEntries = _diary;
    this.persistToStorage();
  }

  /**
   * Removes a diary entry from the diary, if it exists in the diary.
   * @param _entry the diary entry that needs to be removed
   * @returns      the new diary without the entry
   */
  deleteDiaryEntry(_entry: DiaryEntry): DiaryEntry[] {
    const index = this.diaryEntries.findIndex(
      (e) =>
        e.date === _entry.date &&
        e.note === _entry.note &&
        e.allergy === _entry.allergy &&
        e.symptoms === _entry.symptoms
    );
    if (index === -1) return this.getDiary();
    this.diaryEntries.splice(index, 1);
    this.persistToStorage();
    return this.getDiary();
  }

  /**
   * Get's the known allergies for an user
   * @param   _onlyRealAllergies? filter pseudo-allergies (no known allergy) when
   *                              there are other allergies
   * @returns the known allergies
   */
  getKnownAllergies(_onlyRealAllergies = false): CHAllergyIntolerance[] {
    if (_onlyRealAllergies && this.knownAllergies.length > 1) {
      return this.knownAllergies.filter(
        (a: CHAllergyIntolerance) =>
          a.code.coding &&
          a.code.coding[0] &&
          !a.code.coding[0].display?.includes('No known')
      );
    }
    return this.knownAllergies;
  }

  /**
   * Initializes the known allergies
   * @param _allergies the known allergies for the patient as retrieved from
   *                   the EPD playground
   */
  setKnownAllergies(_allergies: CHAllergyIntolerance[]): void {
    this.knownAllergies = _allergies;
    this.persistToStorage();
  }

  /**
   * Adds an allergy to the set of known allergies. if the allergy is
   * already in the array, it is updated
   * @param _allergy an allergy that is known
   * @returns        the new array of known allergies
   */

  addOrUpdateKnownAllergy(
    _allergy: CHAllergyIntolerance
  ): CHAllergyIntolerance[] {
    const index = this.knownAllergies.findIndex((a) => a.id === _allergy.id);
    if (index === -1) {
      this.knownAllergies.push(_allergy);
    } else {
      this.knownAllergies[index] = _allergy;
    }
    this.persistToStorage();
    return this.getKnownAllergies();
  }

  /**
   * Removes an allergy from the set of known allergies
   * @param _allergy the allergy to remove
   * @returns        the new array of known allergies
   */
  removeKnownAllergy(_allergy: CHAllergyIntolerance): CHAllergyIntolerance[] {
    const index = this.knownAllergies.findIndex((a) => a.id === _allergy.id);
    if (index > -1) {
      this.knownAllergies.splice(index, 1);
    }
    this.persistToStorage();
    return this.getKnownAllergies();
  }

  /**
   * Adds an allergy to the set of suspected allergies, but only if it is not
   * a known allergy.
   * @param _allergy the allergy to add
   * @returns        the new array of suspected allergies
   */
  addSuspectedAllergy(
    _allergy: AllergySystemCodeExtension
  ): AllergySystemCodeExtension[] {
    const index = this.suspectedAllergies.findIndex(
      (sa) => sa.defaultCoding.code === _allergy.defaultCoding.code
    );
    const known =
      this.knownAllergies.findIndex((ka: CHAllergyIntolerance) => {
        if (ka.code.coding) {
          const knownCoding = ka.code.coding.find(
            (coding) => coding.system === _allergy.defaultCoding.system
          );
          return (
            knownCoding && knownCoding.code === _allergy.defaultCoding.code
          );
        } else {
          return false;
        }
      }) > -1;
    if (index === -1 && !known) {
      this.suspectedAllergies.push(_allergy);
    }
    this.persistToStorage();
    return this.getSuspectedAllergies();
  }

  /**
   * Returns the suspected allergies.
   * @returns        an array of suspected allergies
   */
  getSuspectedAllergies(): AllergySystemCodeExtension[] {
    return this.suspectedAllergies;
  }

  /**
   * Sets the suspected allergies property.
   * @param _allergies  an array of suspected allergies.
   * @returns           the new array of suspected allergies
   */
  setSuspectedAllergies(
    _allergies: AllergySystemCodeExtension[]
  ): AllergySystemCodeExtension[] {
    this.suspectedAllergies = _allergies;
    this.persistToStorage();
    return this.getSuspectedAllergies();
  }

  /**
   * Removes an allergy from the set of suspected allergies
   * @param _allergy the allergy to remove
   * @returns        an array of suspected allergies as CHAllergyIntolerance
   *                 resources
   */
  removeSuspectedAllergy(
    _allergy: AllergySystemCodeExtension
  ): AllergySystemCodeExtension[] {
    const index = this.suspectedAllergies.findIndex(
      (sa) => sa.defaultCoding.code === _allergy.defaultCoding.code
    );
    if (index > -1) {
      this.suspectedAllergies.splice(index, 1);
    }
    this.persistToStorage();
    return this.getSuspectedAllergies();
  }

  /**
   * Returns the suspected allergies as FHIR resources according to the
   * CH AllergyIntolerance profile.
   * @returns        the new array of suspected allergies
   */
  getSuspectedAllergiesAsFhir(
    _translate?: (str: string) => string
  ): CHAllergyIntolerance[] {
    return this.getSuspectedAllergies().map((suspectedAllergy) => {
      const diaryEntries = this.diaryEntries.filter((diaryEntry) => {
        return (
          diaryEntry.allergy &&
          diaryEntry.allergy.defaultCoding.code ===
            suspectedAllergy.defaultCoding.code
        );
      });
      return this.convertAllergyToFhir(
        suspectedAllergy,
        diaryEntries,
        _translate
      );
    });
  }

  /**
   * Converts an AllergySystemCodeExtension object together with DiaryEntries to a FHIR resource that conforms
   * to the CH AllergyIntolerance profile.
   * @param _allergy  a local allergy as entered by the patient
   * @param _diaryEntries diaryEntries relating to that allergy
   * @param _translate?  a function that translates strings to locale
   */
  private convertAllergyToFhir(
    _allergy: AllergySystemCodeExtension,
    _diaryEntries: DiaryEntry[],
    _translate?: (s: string) => string
  ): CHAllergyIntolerance {
    const userReference: Reference = {
      type: 'Patient',
      display: this.user
        ? this.user.givenName + ' ' + this.user.familyName
        : undefined
    };
    const allergyParams = {
      clinicalStatus: {
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
            code: 'active',
            display: 'Active'
          }
        ]
      },
      verificationStatus: {
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
            code: 'unconfirmed',
            display: 'Unconfirmed'
          }
        ]
      },
      code: {
        coding: [_allergy.defaultCoding]
      },
      patient: this.patient,
      onsetDateTime:
        _diaryEntries.length > 0
          ? _diaryEntries[0].date.toISOString()
          : undefined,
      recorder: userReference,
      asserter: userReference,
      lastOccurrence:
        _diaryEntries.length > 0
          ? _diaryEntries[_diaryEntries.length - 1].date.toISOString()
          : undefined
    };

    const episodes = new Array<AllergyIntoleranceEpisodeParams>();

    _diaryEntries.map((entry) => {
      entry.symptoms.map((symptom) => {
        let severity = undefined as AllergyIntoleranceSeverity | undefined;
        switch (symptom.intensity) {
          case SymptomIntensity.LOW:
            severity = AllergyIntoleranceSeverity.MILD;
            break;
          case SymptomIntensity.MEDIUM:
            severity = AllergyIntoleranceSeverity.MODERATE;
            break;
          case SymptomIntensity.HIGH:
            severity = AllergyIntoleranceSeverity.SEVERE;
            break;
        }
        episodes.push({
          description: entry.note,
          manifestation: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '261665006',
                  display: 'Unknown'
                }
              ]
            }
          ],
          onset: entry.date.toISOString().substring(0, 10),
          severity: severity,
          openEHRLocation: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: symptom.location.sct,
                display: _translate
                  ? _translate(symptom.location.name)
                  : symptom.location.name
              }
            ]
          }
        } as AllergyIntoleranceEpisodeParams);
      });
    });

    return this.fhirUtils.createCHAllergyIntolerance(allergyParams, episodes);
  }

  /**
   * Sets the settings property
   * @param _settings the settings
   */
  setSettings(_settings: Settings) {
    this.settings = _settings;
    this.persistToStorage();
  }

  /**
   * Gets the settings from the store
   * @returns  the persisted settings
   */
  getSettings(): Settings {
    return this.settings;
  }

  /**
   * Gets the default settings
   * @returns  a set of default settings
   */
  getDefaultSettings(): Settings {
    return {
      language: APP_LANGUAGES.DE,
      organization: {
        resourceType: 'Organization',
        id: '1',
        identifier: [
          {
            system: 'urn:oid:2.16.756.5.30.1.178.1.1',
            value: 'Klinik Höheweg'
          }
        ],
        name: 'Klinik Höheweg',
        contact: [
          {
            name: {
              family: 'Loser',
              given: ['Marianne']
            }
          }
        ]
      },
      facilityType: {
        system: 'http://snomed.info/sct',
        code: '264358009',
        display: 'General practice premises'
      },
      practiceSetting: {
        system: 'http://snomed.info/sct',
        code: '394802001',
        display: 'General medicine'
      },
      dashboard: [
        DashboardComponent.TIMELINE,
        DashboardComponent.DIARY_LIST,
        DashboardComponent.NEW_DIARY_ENTRY,
        DashboardComponent.CALENDAR,
        DashboardComponent.ALLERGIES
      ],
      daysDisplayedOnDashboard: 7
    };
  }

  /**
   * Returns the values as set for EPR SPID OID, MPI ID OID,
   * local system OID , AHV number OID
   * @returns a set of  Oids
   */
  getOids(): Oids {
    return this.oids;
  }

  /**
   * Set new values for OIDS (may break some functionality)
   * @param _oids object with properties
   *              - eprSpid,
   *              - mpiSpid,
   *              - local,
   *              - ahv
   *              as strings that have to start with 'urn:oid'
   * @throws      an Error if one of the properties does not start with 'urn:oid'
   */
  setOids(_oids: Oids): void {
    if (!_oids.ahv.includes('urn:oid'))
      throw new Error(
        'Provided AHV OID is not a valid OID, must start with urn:oid. (Provided: ' +
          _oids.ahv +
          ').'
      );
    if (!_oids.eprSpid.includes('urn:oid'))
      throw new Error(
        'Provided EPR SPID OID is not a valid OID, must start with urn:oid. (Provided: ' +
          _oids.eprSpid +
          ').'
      );
    if (!_oids.mpiId.includes('urn:oid'))
      throw new Error(
        'Provided MPI ID OID is not a valid OID, must start with urn:oid. (Provided: ' +
          _oids.mpiId +
          ').'
      );
    if (!_oids.local.includes('urn:oid'))
      throw new Error(
        'Provided local system OID is not a valid OID, must start with urn:oid. (Provided: ' +
          _oids.local +
          ').'
      );
    if (!_oids.app.includes('urn:oid'))
      throw new Error(
        'Provided app system OID is not a valid OID, must start with urn:oid. (Provided: ' +
          _oids.app +
          ').'
      );

    this.oids = _oids;
    this.persistToStorage();
  }

  /**
   * Returns the default values for EPR SPID OID, MPI ID OID,
   * local system OID (for KLINIK Höheweg), AHV number OID
   * @returns a set of default Oids
   */
  getDefaultOids(): Oids {
    return {
      eprSpid: 'urn:oid:2.16.756.5.30.1.127.3.10.3',
      mpiId: 'urn:oid:1.1.1.99.1',
      local: 'urn:oid:2.16.756.5.30.1.178.1.1',
      ahv: 'urn:oid:2.16.756.5.32',
      app: 'urn:oid:1.3.6.1.4.1.12559.11.13.2.5'
    };
  }

  /**
   * Sets the patient property
   * @param _patient the Patient resource
   */
  setPatient(_patient: Patient): void {
    this.patient = _patient;
    this.persistToStorage();
  }

  /**
   * @returns a Patient resource if previously set,
   *          or a empty Patient resource if not set
   */
  getPatient(): Patient {
    return this.patient;
  }

  /**
   * Gets the organization as a useable FHIR resource.
   * @returns A FHIR resource representing the current organization
    */

  getOrganizationResource(): Organization {
    return this.settings.organization;
  }


  /**
   * Gets the currently set language.
   * @returns the set language
   */
  getLanguage(): APP_LANGUAGES {
    return this.settings.language;
  }

  /**
   * Removes all data from storage.
   */
  clearAll(): void {
    this.user = undefined;
    this.patient = {resourceType: 'Patient'};
    this.oids = this.getDefaultOids();
    this.diaryEntries = [];
    this.knownAllergies = [];
    this.suspectedAllergies = [];
    this.settings = this.getDefaultSettings();
    sessionStorage.clear();
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Returns the current dashboard settings
   * @returns An array of objects with component name and setting.
   */
  getDashboardSettings(): { component: DashboardComponent; active: boolean }[] {
    return Object.values(DashboardComponent).map((component) => {
      return {
        component: component as DashboardComponent,
        active: this.settings.dashboard.includes(component)
      };
    });
  }

  /**
   * Sets the visibility settings for dashboard components.
   * @param settings a list containing all visible dashboard components.
   */
  setDashboardSettings(settings: DashboardComponent[]) {
    this.settings.dashboard = settings;
    this.persistToStorage();
  }

  /**
   * Changes the language of the app.
   * @param lang the new language.
   */
  setLanguageSetting(lang: APP_LANGUAGES): void {
    this.settings.language = lang;
    this.persistToStorage();
  }

  /**
   * Returns the entry offset.
   * @returns the offset that define the timespan in which entries will be displayed.
   */
  getDaysDisplayedOnDashboard(): number {
    return this.settings.daysDisplayedOnDashboard;
  }

  /**
   * Sets the offset that define the timespan in which entries will be displayed.
   * @param value the value of the offset.
   */
  setDaysDisplayedOnDashboard(value: number): void {
    this.settings.daysDisplayedOnDashboard = value;
    this.persistToStorage();
  }

  /**
   * Resets the session (and thus clears the sessionStorage,
   * but not the localStorage)
   */
  resetSession(): void {
    this.user = undefined;
    sessionStorage.clear();
  }

  /**
   * Logs out the user and deletes his data.
   */
  logoutUser(): void {
    this.clearAll();
  }
}
