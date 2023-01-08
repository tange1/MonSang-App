import { Organization, Coding, date } from '@i4mi/fhir_r4';
import { AllergySystemCodeExtension } from '@i4mi/mhealth-proto-components';
import { APP_LANGUAGES } from 'src/boot/i18n';

export interface LoginType {
  username: string;
  password: string;
  phone: string;
  prefix?: string;
  givenName: string;
  familyName: string;
  maidenName: string;
  birthdate: date;
  gender: string;
 /*  address: {
    street: string,
    streetNumber: string,
    postalCode: string,
    place: string,
  }; */
  donationNumber: string;
  bloodGroup: string;
}

export enum UIMessageType {
  SMS = 'sms',
  ERROR = 'error'
}

export interface UIMessage {
  type: UIMessageType;
  title: string;
  text: string;
}

export interface Settings {
  language: APP_LANGUAGES;
  organization: Organization;
  facilityType: Coding;
  practiceSetting: Coding;
  dashboard: DashboardComponent[];
  daysDisplayedOnDashboard: number;
}

export enum SymptomIntensity {
  NONE = '260413007', // None (Qualifier value)
  LOW = '255604002', // Mild (Qualifier value)
  MEDIUM = '6736007', // Moderate (severity modifier) (qualifier value)
  HIGH = '24484000' // Severe (severity modifier) (qualifier value)
}

export interface SymptomLocation {
  name: string;
  sct: string;
  image: string;
}

export interface Symptom {
  intensity: SymptomIntensity;
  location: SymptomLocation;
}

// according to http://hl7.org/fhir/R4/codesystem-allergyintolerance-verification.html
export enum AllergyVerificationStatus {
  UNCONFIRMED = 'unconfirmed',
  CONFIRMED = 'confirmed',
  REFUTED = 'refuted',
  ENTERED_IN_ERROR = 'entered-in-error'
}


export interface DiaryEntry {
  date: Date;
  symptoms: Symptom[];
  note?: string;
  allergy?: AllergySystemCodeExtension;
}

export enum DashboardComponent {
  TIMELINE = 'timeline',
  DIARY_LIST = 'diaryList',
  NEW_DIARY_ENTRY = 'newDiaryEntry',
  CALENDAR = 'calendar',
  ALLERGIES = 'allergies'
}
