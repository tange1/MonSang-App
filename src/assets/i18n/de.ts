export default {
  common: {
    maleGender: 'männlich',
    femaleGender: 'weiblich',
    otherGender: 'andere',
    unknown: 'unbekannt',
    cancel: 'Abbrechen',
    close: 'Schliessen',
    copy: 'Kopieren',
    back: 'zurück',
    continue: 'weiter',
    save: 'Speichern',
    loadDefault: 'Standardwerte laden',
    error: 'Ups. Da ist leider etwas schiefgegangen.',
    givenName: 'Vorname',
    familyName: 'Name',
    gender: 'Geschlecht',
    address: 'Adresse',
    canton: 'Kanton',
    search: 'Suchen',
    birthdate: 'Geburtsdatum',
    eprSpid: 'EPR SPID',
    localPid: 'Lokale PID',
    kiloByte: 'Kb',
    megaByte: 'Mb',
    identifier: 'Identifier',
    logout: 'Ausloggen',
    allergy: 'Allergie',
    intolerance: 'Intoleranz',
    yes: 'ja',
    no: 'nein',
    ahv: 'AHV-Nummer',
    author: 'Autor',
    ok: 'OK',
    date: 'Datum',
    remove: 'entfernen',
    description: 'Beschreibung',
    class: 'Klasse',
    type: 'Typ',
    fileType: 'Dateityp',
    fileSize: 'Dateigrösse',
    language: 'Sprache',
    noResults: 'keine Resultate',
    fieldRequired: 'Dies ist ein Pflichtfeld.',
    typeForSearch: 'Tippen um zu suchen',
    month0: 'Januar',
    month1: 'Februar',
    month2: 'März',
    month3: 'April',
    month4: 'Mai',
    month5: 'Juni',
    month6: 'Juli',
    month7: 'August',
    month8: 'September',
    month9: 'Oktober',
    month10: 'November',
    month11: 'Dezember'
  },
  index: {
    diaryTitle: 'Tagebuch',
    diaryText: 'Hier finden Sie alle Tagebucheinträge, die Sie bisher erfasst haben.',
    loginError: 'Es konnten keine passenden Daten für dieses Login / Passwort auf dem EPD Playground gefunden werden.',
    title: 'Dashboard'
  },
  about: {
    title: 'Über den mHealth Prototypen (Patient*innen-Ansicht)',
    aboutText: 'Der mHealth Prototyp (Patient*innen-Ansicht) entstand im Rahmen eines Projektes von eHealth Suisse und dem Institut für Medizininformatik I4MI der Berner Fachhochschule. Er soll als Anschauungsobjekt für patientenzentrierte Use Cases mit dem EPD Playground dienen. Der EPD Playground ist eine bewusst niederschwellig erstellte Test-Instanz des eidgenössischen Patientendossiers EPD.',
    readMore: 'Unter den folgenden Links erfahren Sie mehr zu den Projektpartnern, zum elektronischen Patientendossier und zum EPD Playground:',
    version: 'Version:'
  },
  calendar: {
    title: 'Allergie-Kalender',
    entriesLabel: 'Einträge',
    entryLabel: 'Eintrag',
    entriesFrom: 'Einträge vom',
    entryTimeLabel1: 'Eintrag um ',
    entryTimeLabel2: ' Uhr'
  },
  documents: {
    title: 'Ihre Gesundheits-Dokumente',
    openPrompt1: 'Möchten Sie das Dokument "',
    openPrompt2: '" wirklich laden?',
    unknownTitle: 'unbenanntes Dokument',
    searchComponent: {
      documentTableLabel: 'Dokumente für MPI ID: ',
      fetchMpi: 'Lade Master Patient Index ID...',
      fetchedMpi: 'Master Patient Index ID geladen: ',
      fetchMetadata: 'Lade Dokument-Metadaten...',
      fetchingError: 'Die Metadaten konnten leider nicht geladen werden.',
    },
    uploadComponent: {
      titleLabel: 'Titel',
      titleInput: 'Titel der Datei',
      descriptionText: 'Ergänzen Sie die Beschreibung zur Datei.',
      uploadFile: 'Datei hochladen für: ',
      fileTypeCategory: 'Kategorie des Dateityps',
      fileType: 'Typ der Datei',
      fileTypeText: 'Geben Sie den Typ der Datei an.',
      selectFile: 'Datei auswählen',
      selectFileText: 'Wählen Sie eine Datei aus, die Sie hochladen möchten:',
      metadata: 'Metadaten',
      metadataText: 'Ergänzen Sie die Metadaten zur Datei.',
      titleAndDescription: 'Titel & Beschreibung',
      languageText: 'Geben Sie die Sprache des Dateiinhalts an.',
      typeNotSufficient: 'Bei nicht näher bezeichneten Dateitypen ist die Kategorie der Datei erforderlich.',
      creatingInstitution: 'Erstellende Institution',
      creatingInstitutionText: 'Geben Sie den Typ der Institution an, die die Datei erstellt hat.',
      institution: 'Institution',
      specialisation: 'Fachrichtung',
      specialisationText: 'Geben Sie den Fachrichtung der Institution an, die die Datei erstellt hat.',
      jsonFhir: 'JSON-Datei mit FHIR-Inhalt'
    }
  },
  layout: {
    title: 'MonSang',
    subtitle: '(mHealth Prototyp)',
    logoutPrompt: 'Möchten Sie sich wirklich ausloggen?',
    menu: {
      notification: 'Benachrichtigungen',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      logout: 'Ausloggen',
      title: 'Menü',
      home: 'Dashboard',
      documents: 'Ihre Dokumente im EPD',
      upload: 'Dokument ins EPD speichern',
      allergies: 'Ihre Allergien',
      settings: 'Einstellungen',
      about: 'Über den mHealth Prototyp'
    }
  },
  allergy: {
    title: 'Meine Allergien',
    tabKnown: 'Bestätigte Allergien',
    tabKnownShort: 'Bestätigt',
    tabSuspected: 'Vermutete Allerien',
    tabSuspectedShort: 'Vermutet',
    suspectedSubtitle: 'Vermutete Allergie oder Intoleranz',
    noEntries: 'Es sind keine Allergien oder Intoleranzen vorhanden.',
    allergy: 'Allergie',
    intolerance: 'Intoleranz',
    typeLabel: 'Typ',
    codeDisplayLabel: 'Beschreibung',
    clinicalStateLabel: 'Status',
    verificationStateLabel: 'Verifikation',
    reactionLabel: 'Reaktion',
    reactionsLabel: 'Reaktionen',
    reactionDateLabel: 'Reaktionsdatum',
    reactionSeverityLabel: 'Schwere',
    reactionSubstanceLabel: 'Substanz',
    reactionDescriptionLabel: 'Beschreibung',
    reactionNoteLabel: 'Kommentar zur Reaktion',
    reactionLocationLabel: 'Lokalisation',
    additionalInformation: 'Zusätzliche Informationen:',
    categoryLabel: 'Kategorie',
    criticalityLabel: 'Schweregrad',
    noteLabel: 'Kommentar',
    exposureDateLabel: 'Expositionsdatum',
    exposureRouteLabel: 'Expositionsweg',
    noOtherDataAvailable: 'Es sind keine weiteren Daten verfügbar.',
    status: {
      unconfirmed: 'nicht ärztlich bestätigt',
      confirmed: 'ärztlich bestätigt',
      refuted: 'widerlegt',
      'entered-in-error': 'fälschlicherweise eingegeben'
    },
    noAllergy: 'Keine Allergien'
  },
  diary: {
    title: 'Tagebucheintrag vom',
    createTitle: 'Neuer Tagebucheintrag',
    dateLabel: 'Datum',
    noteLabel: 'Anmerkungen',
    noteHint: 'Hier können Sie zusätzliche Bemerkungen zum Tagebuch-Eintrag erfassen.',
    symptomsLabel: 'Symptome',
    symptomsHint: 'Erfassen Sie Ihre Symptome zum Tagebuch-Eintrag.',
    allergyLabel: 'Allergie',
    allergyHint: 'Wenn Sie vermuten, dass die Symptome mit einer Ihrer Allergien oder Intoleranzen zusammenhängen, können Sie das hier erfassen.',
    noSymptoms: 'Keine Symptome erfasst',
    intensity: 'Intensität:',
    newSymptom: 'Neues Symptom:',
    editDate: 'Datum und Zeit:',
    locationAlert: 'Bitte geben Sie an, welche Stelle vom Symptom betroffen ist.',
    noData: 'Es sind noch keine Einträge verfügbar, die angezeigt werden könnten. Erstellen Sie einen neuen Tagebuch-Eintrag, um ihn hier zu sehen.',
  },
  suspectedAllergies: {
    title: 'Verdachts-Allergien',
    explanation: 'Falls Sie den Verdacht haben, an einer Allergie oder Intoleranz zu leiden, können Sie diese hier hinzufügen um sie zu beobachten.',
    button: 'Verdachtsallergien hinzufügen'
  },
  symptom: {
    unknown: '',
    eye: 'Auge(n)',
    nose: 'Nase',
    mouth: 'Mund',
    lung: 'Atemwege',
    skin: 'Hautreizung',
    gastro: 'Verdauungsapparat',
    '260413007': 'keine Symptome',
    '255604002': 'gering',
    '6736007': 'mittel',
    '24484000': 'hoch',
    location: 'Betroffene Stelle'
  },
  login: {
    welcome1: 'Willkommen zur MonSang App!',
    welcome2: 'Loggen Sie sich mit Ihrer Mailadresse ein, um Ihre Gesundheitsdaten abzurufen.',
    eid_label: 'e-Mail',
    password_label: 'Passwort',
    login_label: 'Login',
    invalid_password: 'Die eingegebene eID oder das Passwort ist ungültig.',
    enter_code1: 'Bitte geben Sie den Code ein, der an ',
    enter_code2: ' gesendet wurde.',
    resend: 'Code erneut senden',
    code_label: 'Code',
    check_label: 'Prüfen',
    invalid_code: 'Der eingegebene Code ist nicht korrekt.',
    message_title: 'SMS von EPD Playground an ',
    message_text: 'Ihr Code für den EPD Playground Use Case ist: '
  },
  settings: {
    'de-CH': 'Deutsch (Schweiz)',
    en: 'Englisch',
    'fr-CH': 'Französisch (Schweiz)',
    it: 'Italienisch',
    languageText: 'Wählen Sie die Sprache für die EPD Playground Demo App (zurzeit nur Deutsch und Französisch verfügbar).',
    logoutText: 'Loggen Sie sich aus oder wechseln Sie den/die Benutzer•in.',
    oidsTitle: 'OID / Systemidentifier',
    oidsText: 'Hier können Sie die OIDs der verschiedenen Code-Systeme einsehen. Die OIDs sind fest vergeben und können deshalb nicht geändert werden.',
    oidsMpi: 'OID für das System der Master Patient Index ID',
    oidsSpid: 'OID für das System der EPR SPID',
    oidsAhv: 'OID für das System der AHV-Nummern',
    oidsApp: 'OID für diese App (mHealth Prototyp)',
    dashboardText: 'Konfigurieren Sie, welche Komponenten auf dem Dashboard angezeigt werden sollen.',
    timeline: 'Zeitstrahl der Symptome',
    diaryList: 'Liste der Tagebuch-Einträge',
    newDiaryEntry: 'Eingabemaske für Tagebuch-Einträge',
    calendar: 'Kalender-Ansicht der Tagebuch-Einträge',
    allergies: 'Übersicht der bestätigten und vermuteten Allergien und Intoleranzen.',
    exportImportTitle: 'Lokale Daten importieren und exportieren',
    exportImportText: 'Hier können Sie die lokal gespeicherten Daten (Tagebucheinträge, vermutete Allergien und Einstellungen) exportieren und importieren. Beachten Sie, dass die bestehenden Daten beim Import überschrieben werden.',
    export: 'exportieren',
    import: 'importieren',
  },
  exportImport: {
    exportTitle: 'Lokale Daten exportieren',
    exportText: 'Kopieren Sie einfach das unten stehende JSON und speichern Sie es ab.',
    importTitle: 'Lokale Daten importieren',
    importText: 'Fügen Sie das zuvor exportierte JSON unten ein.',
  },
  e404: {
    title: '404',
    text: 'Ooops. Hier gibt es nichts zu sehen.',
    goHome: 'Zurück zum Hauptbildschirm'
  },
  timeline: {
    title: 'Ihre Timeline',
    xAxis: 'Datum',
    yAxis: 'Intensität des Symptoms',
    filter: 'Nach Allergie filtern',
    noShowText: 'Ihr Bildschirm ist nicht breit genug, um Ihre Timeline anzuzeigen. Versuchen Sie es im Querformat oder wechseln Sie den Bildschirm.',
    date: 'Datum',
    noGraph: 'Es wurde keine Tagebucheinträge gefunden.'
  },
  dashboardFAB: {
    title: 'Dashboardeinstellungen',
    entriesText: 'Einträge zum Anzeigen:',
    allEntries: 'alle Einträge',
    last30days: 'letzte 30 Tage',
    last7days: 'letzte 7 Tage',
    componentsText: 'Komponenten zum Anzeigen:'
  }
};
