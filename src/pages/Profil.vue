<template>
  <q-page padding class="start">
    <div>

      <q-card class="col-6">
        <q-card-section class="card-title">Profil</q-card-section>

        <q-list bordered class="rounded-borders">

          <q-expansion-item expand-separator icon="perm_identity" label="Personalien" color="primary">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col">
                    Familienname
                  </div>
                  <div class="col">
                    {{ user.familyName }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Vorname
                  </div>
                  <div class="col">
                    {{ user.givenName }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Geburtsname
                  </div>
                  <div class="col">
                    {{ user.maidenName }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Geburtsdatum
                  </div>
                  <div class="col">
                    {{ user.birthdate }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Geschlecht
                  </div>
                  <div class="col">
                    {{ user.gender }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Telefon
                  </div>
                  <div class="col">
                    {{ user.phone }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    E-Mail
                  </div>
                  <div class="col">
                    {{ user.username }}
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Spendernummer
                  </div>
                  <div class="col">
                    {{ user.donationNumber }}
                  </div>
                </div>


              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="home" label="Wohnort">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col">
                    Strasse
                  </div>
                  <div class="col">
                    Beispielstrasse
                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Strassennummer
                  </div>
                  <div class="col">

                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Postleitzahl
                  </div>
                  <div class="col">

                  </div>
                </div>
                <q-separator horizontal spaced />
                <div class="row">
                  <div class="col">
                    Ort
                  </div>
                  <div class="col">

                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="bloodtype" label="Blutgruppe">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col">
                    Blutgruppe
                  </div>
                  <div class="col">
                    0+
                  </div>
                </div>
                <q-separator horizontal spaced />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="history" label="Spendehistorie">
            <q-card>
              <q-item>
                <q-item-section>
                  <q-item-label>Wann: 19.12.2022</q-item-label>
                  <q-item-label caption lines="3">Wo: Blutspendezentrum Bern
                    Murtenstrasse 137A
                    3009 Bern</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="emergency" color="primary" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item>
                <q-item-section>
                  <q-item-label>Wann: 03.08.2022</q-item-label>
                  <q-item-label caption lines="3">Wo: Blutspendezentrum Bern
                    Murtenstrasse 137A
                    3009 Bern</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="emergency" color="primary" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item>
                <q-item-section>
                  <q-item-label>Wann: 14.02.2022</q-item-label>
                  <q-item-label caption lines="3">Wo: Blutspendezentrum Bern
                    Murtenstrasse 137A
                    3009 Bern</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="emergency" color="primary" />
                </q-item-section>
              </q-item>

            </q-card>

          </q-expansion-item>

          <q-expansion-item expand-separator icon="settings" label="Einstellungen">
            <q-card>
              <q-list>
                <q-item tag="label">
                  <q-item-section>
                    <q-item-label>Spendetauglichkeit</q-item-label>
                    <q-item-label caption>Benachrichtigung erhalten, sobald nach der letzten Spenden wieder gespendet
                      werden darf.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="primary" v-model="notifications" val="battery" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />

                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Niedriger Blutgruppenbestand</q-item-label>
                    <q-item-label caption>Benachrichtigung erhalten, wenn es zu meiner Blutgruppe wenig Bestand
                      hat.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="primary" v-model="notifications" val="friend" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />

                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Kommende Blutspende-Events</q-item-label>
                    <q-item-label caption>Benachrichtigung erhalten, wenn Blutspende-Events in der Nähe
                      anstehen.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="primary" v-model="notifications" val="picture" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />

                <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select v-model="model" :options="options" label="Wählen Sie eine Sprache" />
    </div>
  </div>


              </q-list>
            </q-card>
          </q-expansion-item>

        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { LoginType } from 'src/model/interfaces';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    return {
      tab: ref('personalien'),
      splitterModel: ref('20'),
      value1: ref(true),
      value2: ref(true),
      value3: ref(true),
      text: ref(''),
      user: {} as LoginType,
      notifications: ref(['friend']),
      model: ref('Deutsch'),
      options: [
        'Deutsch', 'Français', 'Italiano', 'English'
      ]

    };
  },
  mounted() {
    this.user = this.$store.getUser() || ({} as LoginType);
  },
});
</script>

<style>
.start {
  margin-top: 0pt;
}
</style>

<!--template>
  <q-card>
    <q-card-section class="card-title">{{$t('documents.title')}}</q-card-section>
    <q-card-section>
      <DocumentSearch :patient="$store.getPatient()"
                      ref="documentSearch"
                      :locale="$store.getSettings().language"
                      :demoMode="false"
                      :addedDocuments="uploadedDocuments"
                      @found-document="openDocument"
                      :fhirUtils="$fhirUtils"
                      :languageString="$store.getSettings().language.substring(0,2) || 'de'"
                      :epdPlaygroundUtils="$epdUtils"
                      :translations="documentSearchStrings"/>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showAllergyPopup"
            class="dialog">
      <q-card class="allergy-dialog-card">
        <q-card-section class="card-title with-close-icon">
          {{ allergyToDisplay ? getAllergyName(allergyToDisplay): '' }}
          <q-icon @click="() => {
                showAllergyPopup = false;
                allergyToDisplay = undefined;
              }"
              name="fas fa-times"
              class="close-icon"
              flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <AllergyView
            :allergyIntolerance="allergyToDisplay"
            :translations="allergyStrings"
            :languageString="$store.getSettings().language.substring(0, 2) || 'de'"
            :fhirUtils="$fhirUtils"
            :epdPlaygroundUtils="$epdUtils"
            :showTitle="false" />
        </q-card-section>
      </q-card>
  </q-dialog>

</template>

<script lang="ts">
import { DocumentReference } from '@i4mi/fhir_r4';
import { defineComponent } from 'vue';
import { DocumentSearch, CHAllergyIntolerance, AllergyView, ALLERGY_IDENTIFICATION_CODES, FhirUtilLanguageType } from '@i4mi/mhealth-proto-components';

export default defineComponent({
  name: 'Documents-Page',
  components: { DocumentSearch, AllergyView },
  data() {
    return {
      uploadedDocuments: new Array<DocumentReference>(),
      lang: this.$i18n.locale.substring(0,2) as FhirUtilLanguageType,
      showAllergyPopup: false,
      allergyToDisplay: undefined as CHAllergyIntolerance | undefined,
      documentSearchStrings: {
        titleLabel: this.$t('documents.searchComponent.documentTableLabel'),
        fetchMpiLabel: this.$t('documents.searchComponent.fetchMpi'),
        mpiLabel: this.$t('documents.searchComponent.fetchedMpi'),
        fetchMetadataLabel: this.$t('documents.searchComponent.fetchMetadata'),
        fetchingError: this.$t('documents.searchComponent.fetchingError'),
        kiloByteLabel: this.$t('common.kiloByte'),
        megaByteLabel: this.$t('common.megaByte'),
        searchLabel: this.$t('common.search'),
        dateLabel: this.$t('common.date'),
        descriptionLabel: this.$t('common.description'),
        classLabel: this.$t('common.class'),
        typeLabel: this.$t('common.type'),
        authorLabel: this.$t('common.author'),
        fileTypeLabel: this.$t('common.fileType'),
        fileSizeLabel: this.$t('common.fileSize')
      },
      allergyStrings: {
        allergy: this.$t('allergy.allergy'),
        intolerance: this.$t('allergy.intolerance'),
        typeLabel: this.$t('allergy.typeLabel'),
        codeDisplayLabel: this.$t('allergy.codeDisplayLabel'),
        dateLabel: this.$t('common.date'),
        clinicalStateLabel: this.$t('allergy.clinicalStateLabel'),
        verificationStateLabel: this.$t('allergy.verificationStateLabel'),
        reactionLabel: this.$t('allergy.reactionLabel'),
        reactionsLabel: this.$t('allergy.reactionsLabel'),
        reactionDateLabel: this.$t('allergy.reactionDateLabel'),
        reactionSubstanceLabel: this.$t('allergy.reactionSubstanceLabel'),
        reactionSeverityLabel: this.$t('allergy.reactionSeverityLabel'),
        reactionDescriptionLabel: this.$t('allergy.reactionDescriptionLabel'),
        additionalInformation: this.$t('allergy.additionalInformation'),
        categoryLabel: this.$t('allergy.categoryLabel'),
        criticalityLabel: this.$t('allergy.criticalityLabel'),
        noteLabel: this.$t('allergy.noteLabel'),
        exposureDateLabel: this.$t('allergy.exposureDateLabel'),
        exposureRouteLabel: this.$t('allergy.exposureRouteLabel'),
        reactionNoteLabel: this.$t('allergy.reactionNoteLabel'),
        reactionLocationLabel: this.$t('allergy.reactionLocationLabel'),
        noOtherDataAvailable: this.$t('allergy.noOtherDataAvailable')
      },
    }
  },
  methods: {
    openDocument(e: {document: string, metadata: DocumentReference}) {
      const documentReference = e.metadata;
        if (
          documentReference.content &&
          documentReference.content[0] &&
          documentReference.content[0].attachment &&
          documentReference.content[0].attachment.url
        ) {
          if(this.checkIfIsAllergy(documentReference)) {
            this.$epdUtils.useITI68(documentReference)
            .then(allergy => {
              this.showAllergyPopup = true;
              this.allergyToDisplay = JSON.parse(allergy) as CHAllergyIntolerance;
            })
            .catch(e => console.log(e))

          } else {
            if (
              confirm(this.$t('documents.openPrompt1') + (documentReference.description || this.$t('documents.unknownTitle')) + this.$t('documents.openPrompt2'))
            ) {
              window.open(documentReference.content[0].attachment.url, (documentReference.description || this.$t('documents.unknownTitle')), 'height='+ ( window.innerHeight * 0.7).toString() + ',width=' + (window.innerWidth * 0.7).toString());
            }
          }
        } else {
          console.log('Can not open document in window, unsufficient metadata', document);
        }
    },
    checkIfIsAllergy(document: DocumentReference): boolean {
      return (document.content[0].attachment.contentType === 'application/fhir+json') &&
             (document.type !== undefined) &&
             (document.type.coding  !== undefined) &&
             (document.type.coding.findIndex(coding => {
                return coding.code === '722446000'
             }) > -1);
    },
    getAllergyName(allergy: CHAllergyIntolerance): string {
      const allergyCoding = allergy.code.coding?.find(coding => coding.system && coding.system === 'http://snomed.info/sct');
      if (allergyCoding && allergyCoding.code) {
        const code = ALLERGY_IDENTIFICATION_CODES.find(code => code.defaultCoding.code === allergyCoding.code);
        return code?.languageDisplays[this.lang] || this.$t('common.unknown');
      }
    return this.$t('common.unknown')
    },

  }
});
</script>

<style scoped lang="scss">
  .card-title.with-close-icon {
  padding-right: 2em;
}
.close-icon {
  cursor: pointer;
  color: #000000;
  right: 0.5em;
  top: 0.5em;
  position: absolute;
}
.close-icon:hover {
  opacity: 0.5;
}
.allergy-dialog-card {
  width: 60%;
  min-width: 300px;
}
</style-->
