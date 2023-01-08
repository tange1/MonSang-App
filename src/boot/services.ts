import { boot } from 'quasar/wrappers';
import Store from 'src/services/storeService';
import { ENV } from '../assets/env.js';
import { FhirUtils, EpdPlaygroundUtils } from '@i4mi/mhealth-proto-components';


const fhirUtils = new FhirUtils(ENV.BASE_URL);
const store = new Store(fhirUtils);
const epdUtils = new EpdPlaygroundUtils(ENV, store.getOids());

// Type declaration
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $store: Store;
    $fhirUtils: FhirUtils;
    $epdUtils: EpdPlaygroundUtils
  }
}

export default boot(({ app }) => {
  // Set global variables
  app.config.globalProperties.$store = store;
  app.config.globalProperties.$fhirUtils = fhirUtils;
  app.config.globalProperties.$epdUtils = epdUtils;
});

export { store, fhirUtils, epdUtils };
