<template>
  <router-view v-if="isLoggedIn" />
  <LoginMock
    v-else
    :acceptedLogins="logins"
    :onLogin="login"
    @message="displayMessage"
    :processing="processingLogin"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Notify } from 'quasar';
import LoginMock from './components/LoginMock.vue';
import { LoginType, UIMessage, UIMessageType } from './model/interfaces';
import ACCEPTED_LOGINS from './assets/acceptedLogins.json';
import { DocumentReferenceStatus } from '@i4mi/fhir_r4';
import { CHAllergyIntolerance } from '@i4mi/mhealth-proto-components';

const toasts = new Array<() => void>();

export default defineComponent({
  name: 'App',
  components: { LoginMock },
  data() {
    return {
      isLoggedIn: false,
      processingLogin: false,
      logins: ACCEPTED_LOGINS as LoginType[]
    };
  },
  beforeMount() {
    if (this.$root) {
      this.$root.$i18n.locale = this.$store.getLanguage();
    }
  },
  mounted() {
    this.isLoggedIn = this.$store.getUser() !== undefined;
    if (this.isLoggedIn) {
      this.fetchKnownAllergies()
        .then(() => {
          this.processingLogin = false;
        })
        .catch((e) => console.log(e));
    }
  },
  methods: {
    login(user: LoginType): void {
      // hide toasts
      this.processingLogin = true;
      toasts.forEach((toast) => {
        toast();
      });
      if (user) {
        // fetch patient data from EPD Playground
        this.$epdUtils
          .useITI78({
            given: user.givenName,
            family: user.familyName
          })
          .then((patientResources) => {
            if (patientResources.length === 0) {
              this.displayMessage({
                type: UIMessageType.ERROR,
                title: 'common.error',
                text: 'index.loginError'
              });
              console.warn(
                'No corresponding patient found on EPD Playground for ' +
                  user.givenName +
                  ' ' +
                  user.familyName +
                  '.'
              );
            } else {
              this.$store.setUser(user);
              this.$store.setPatient(patientResources[0]);
              this.fetchKnownAllergies()
                .then(() => {
                  this.processingLogin = false;
                  this.isLoggedIn = true;
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((error) => {
            this.displayMessage({
              type: UIMessageType.ERROR,
              title: 'common.error',
              text: 'index.loginError'
            });
            console.warn('Something went wrong logging in', error);
          });
      }
    },
    fetchKnownAllergies(): Promise<void> {
      const pat = this.$store.getPatient();
      return new Promise((resolve, reject) => {
        if (pat.identifier) {
          const mpiIdentifier = pat.identifier.find(
            (i) => i.system === this.$epdUtils.getOids().mpiId
          );
          if (mpiIdentifier && mpiIdentifier.system && mpiIdentifier.value) {
            this.$epdUtils
              .useITI67({
                status: DocumentReferenceStatus.CURRENT,
                'patient.identifier':
                  mpiIdentifier.system + '|' + mpiIdentifier.value,
                type: 'http://snomed.info/sct|722446000'
              })
              .then((documentList) => {
                const allergyPromises = documentList.map((document) => {
                  return this.$epdUtils
                    .useITI68(document)
                    .then((ai) => {
                      if (ai.charAt(0) === '<') {
                        console.log(
                          'Loading known allergies: XML data is currently not supported, ignored document with id:',
                          document.id
                        );
                        return undefined;
                      }
                      const allergyIntolerance = JSON.parse(
                        ai
                      ) as CHAllergyIntolerance;

                      // filter out old / broken resources
                      if (
                        allergyIntolerance.recorder === undefined ||
                        allergyIntolerance.patient === undefined ||
                        allergyIntolerance.code === undefined
                      ) {
                        return undefined;
                      }

                      return allergyIntolerance;
                    })
                    .catch((e) => {
                      console.log(e, document);
                      return reject(
                        'Something went wrong fetching a document, see console.'
                      );
                    });
                });

                Promise.all(allergyPromises)
                  .then((allergyIntolerances) => {
                    // filter out undefined entries (from unparsed XML files)
                    allergyIntolerances = allergyIntolerances.filter(
                      (ai) => ai !== undefined
                    );
                    this.$store.setKnownAllergies(
                      allergyIntolerances as CHAllergyIntolerance[]
                    );
                    return resolve();
                  })
                  .catch((e) => {
                    console.warn(
                      'Something went wrong fetching the AllergyIntolerance resources for Document List:',
                      documentList,
                      e
                    );
                    return reject(
                      'Something went wrong fetching the AllergyIntolerance resources, see console.'
                    );
                  });
              })
              .catch((e) => {
                console.log(
                  'Something went wrong fetching the known allergies',
                  e
                );
                return reject(
                  'Something went wrong fetching the known allergies, see console.'
                );
              });
          } else {
            return reject('Current patient has no correct identifier.');
          }
        }
      });
    },
    displayMessage(message: UIMessage) {
      switch (message.type) {
        case UIMessageType.SMS:
          toasts.push(
            Notify.create({
              message: message.title,
              caption: message.text,
              position: 'top-right'
            })
          );
          break;
        case UIMessageType.ERROR:
          toasts.push(
            Notify.create({
              message: message.title,
              caption: message.text,
              type: 'negative'
            })
          );
          console.warn('ERROR - ' + message.title + ': ' + message.text);
      }
    }
  }
});
</script>

<style lang="scss">
html {
  background-color: $background;
}
.card-title {
  color: $primary;
  font-size: 1.2em;
  text-align: center;
  font-weight: bolder;
  border-bottom-color: $gray;
  border-bottom-style: dotted;
  border-bottom-width: 1px;
  padding-bottom: 0.5em;
}
.q-card {
  margin: 1.5em;
}
.q-card p {
  margin-bottom: 0.4em;
  text-align: justify;
}
a:hover {
  text-decoration: none;
  color: $text;
}
a:visited {
  text-decoration: none;
}
.q-table__title {
  font-size: 1.2em;
}
</style>
