<template>
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
</style>
