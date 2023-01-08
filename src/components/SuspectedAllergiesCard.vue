<template>
  <q-card class="suspected-allergies-card">
    <q-card-section class="card-title">
      {{ $t('suspectedAllergies.title') }}
      <q-icon @click="$emit('close', {save: false, allergies: []})"  name="fas fa-times" class="close-icon" flat round dense v-close-popup/>
    </q-card-section>
    <q-card-section>
      <p>
        {{ $t('suspectedAllergies.explanation') }}
      </p>
      <q-select v-model="allergies"
                :label="$t('common.typeForSearch')"
                :options="searchAllergies"
                multiple
                options-dense
                hide-selected
                use-input
                :option-label="(option) => option &&  option.languageDisplays[lang]"
                @filter="(val, update) => {
                  const search = val.toLowerCase();
                  if (val === '') {
                    return
                  } else {
                    update(() => {
                      searchAllergies = availableAllergies.filter(ac => ac.languageDisplays[lang].toLowerCase().includes(search))
                    });
                  }
                }"
        />

      <ul>
        <li v-for="allergy, i in allergies" :key="allergy.defaultCoding.code">
          {{ allergy.languageDisplays[lang] }}
          <span @click="() => allergies.splice(i,1)"
                class="delete-x">
                [ {{$t('common.remove')}} ]
          </span>
        </li>
      </ul>
      </q-card-section>
      <q-card-actions align="center">

        <q-btn :label="$t('common.save')" @click="$emit('close', {save: true, allergies: allergies})" />
      </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { AllergySystemCodeExtension } from '@i4mi/mhealth-proto-components';
import { defineComponent, PropType } from 'vue';

/**
 * Mocks the login to the platform with a token displayed in the UI.
 */
export default defineComponent({
  name: 'SuspectedAllergiesCard',
  data() {
    return {
      allergies: this.suspectedAllergies.slice(),
      searchAllergies: this.availableAllergies.slice(),
      lang: this.$i18n.locale.substring(0,2)
    }
  },
  /**
   *
   */
  emits: {
    /**
     * Notify parent about new state of suspected allergies.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'close': (payload: {save: boolean, allergies: AllergySystemCodeExtension[]}) => {
      return true;
    },
  },
  props: {
    /**
     * Available allergies to filter from.
     */
    availableAllergies: {
      type: Array as PropType<Array<AllergySystemCodeExtension>>,
      required: true
    },
    /**
     * Already set suspected allergies
     */
    suspectedAllergies: {
      type: Array as PropType<Array<AllergySystemCodeExtension>>,
      required: true
    }
  },
  methods: {
  }
});
</script>

<style scoped lang="scss">
.suspected-allergies-card {
  min-width: 300px;
  max-width: 80vw;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10vh;
}
.delete-x {
  cursor: pointer;
  opacity: 0.8;
  font-size: 0.8em;
}
.delete-x:hover {
  opacity: 1;
  color: $negative;
}
ul {
  padding-left: 1.5em;
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
</style>
