<template>
  <q-card v-if="exportMode" class="export-import-card">
    <q-card-section class="card-title">
      {{ $t('exportImport.exportTitle') }}
    </q-card-section>
    <q-card-section>
      <p>{{ $t('exportImport.exportText') }}</p>
      <q-input v-model="jsonData" filled type="textarea" />
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat @click="copy">{{ $t('common.copy') }}</q-btn>
      <q-btn flat @click="$emit('close')">{{ $t('common.close') }}</q-btn>
    </q-card-actions>
  </q-card>
  <q-card v-if="!exportMode" class="export-import-card">
    <q-card-section class="card-title">
      {{ $t('exportImport.importTitle') }}
    </q-card-section>
    <q-card-section>
      <p>{{ $t('exportImport.importText') }}</p>
      <q-input v-model="jsonData" filled type="textarea" />
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat @click="paste">{{ $t('settings.import') }}</q-btn>
      <q-btn flat @click="$emit('close')">{{ $t('common.cancel') }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { copyToClipboard } from 'quasar';
import { UserData } from 'src/services/storeService';

export default defineComponent({
  name: 'ExportImportCard',
  components: {},
  props: {
    exportMode: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      jsonData: ''
    };
  },
  emits: {
    /**
     * Notify parent about cosing of component.
     */
    close: () => true
  },
  beforeMount() {
    if (this.exportMode) {
      let data: UserData = {
        user: this.$store.getUser()?.username ?? '',
        diaryEntries: this.$store.getDiary(),
        suspectedAllergies: this.$store.getSuspectedAllergies(),
        settings: this.$store.getSettings()
      };
      this.jsonData = JSON.stringify(data);
    }
  },
  methods: {
    copy() {
      copyToClipboard(this.jsonData)
        .then(() => {
          this.$emit('close');
        })
        .catch(() => {
          console.log('error during the copy!');
        });
    },
    paste() {
      let data = JSON.parse(this.jsonData) as UserData;
      this.$store.setDiary(data.diaryEntries);
      this.$store.setSuspectedAllergies(data.suspectedAllergies);
      this.$store.setSettings(data.settings);
      this.$emit('close');
      this.$router.go(0);
    }
  }
});
</script>

<style scoped lang="scss">
.export-import-card {
  min-width: 350px;
  max-width: 90vw;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10vh;
}
</style>
