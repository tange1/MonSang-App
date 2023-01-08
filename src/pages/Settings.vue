<template>
  <q-card class="settings-card">
    <q-card-section class="card-title">{{
      $t('layout.menu.settings')
    }}</q-card-section>
    <q-card-section>
      <form>
        <h3>{{ $t('common.language') }}</h3>
        <p>{{ $t('settings.languageText') }}</p>
        <q-select
          class="lang-select"
          v-model="language"
          :options="availableLanguages"
          :option-label="
            (value) => (value == null ? '-' : $t('settings.' + value))
          "
          :disable="availableLanguages.length < 2"
          :label="$t('common.language')"
          @update:model-value="updateLanguageSetting"
        />

        <q-separator size="0pt" />
        <h3>{{ $t('index.title') }}</h3>
        <p>{{ $t('settings.dashboardText') }}</p>
        <DashboardSettings />
        <q-separator size="0pt" />
        <h3>{{ $t('settings.exportImportTitle') }}</h3>
        <p>{{ $t('settings.exportImportText') }}</p>

        <q-btn
          class="btn"
          outline
          color="primary"
          :label="$t('settings.export')"
          @click="exportData"
        />

        <q-btn
          class="btn"
          outline
          color="primary"
          :label="$t('settings.import')"
          @click="importData"
        />

        <q-separator size="0pt" />
        <h3>{{ $t('settings.oidsTitle') }}</h3>
        <p>{{ $t('settings.oidsText') }}</p>
        <ul class="oid-list">
          <li>
            <b>{{ $t('settings.oidsMpi') }}:</b> <br />
            {{ oids.mpiId }}
          </li>
          <li>
            <b>{{ $t('settings.oidsSpid') }}:</b> <br />
            {{ oids.eprSpid }}
          </li>
          <li>
            <b>{{ $t('settings.oidsAhv') }}:</b> <br />
            {{ oids.ahv }}
          </li>
          <li>
            <b>{{ $t('settings.oidsApp') }}:</b> <br />
            {{ oids.app }}
          </li>
        </ul>
      </form>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showExportDialog" no-backdrop-dismiss class="dialog">
    <export-import-card exportMode @close="showExportDialog = false">
    </export-import-card>
  </q-dialog>

  <q-dialog v-model="showImportDialog" no-backdrop-dismiss class="dialog">
    <export-import-card @close="showImportDialog = false"> </export-import-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_LANGUAGES, AVAILABLE_LANGUAGES } from '../boot/i18n';
import ExportImportCard from 'src/components/ExportImportCard.vue';
import DashboardSettings from 'src/components/DashboardSettings.vue';

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      language: this.$store.getLanguage(), // set language
      availableLanguages: new Array<string>(),
      // available languages (for picker
      oids: this.$store.getOids(),
      dashboardOptions: this.$store.getDashboardSettings(),
      showExportDialog: false,
      showImportDialog: false
    };
  },
  beforeMount() {
    AVAILABLE_LANGUAGES.forEach((lang) => this.availableLanguages.push(lang));
    this.reset(undefined, false);
  },
  methods: {
    save(e: Event) {
      e.preventDefault();
    },
    reset(e: Event | undefined, getDefault: boolean): void {
      e && e.preventDefault();
      const settings = getDefault
        ? this.$store.getDefaultSettings()
        : this.$store.getSettings();
      this.language = settings.language;
    },
    updateLanguageSetting(lang: APP_LANGUAGES): void {
      if (this.$root) {
        this.$root.$i18n.locale = lang;
        this.$store.setLanguageSetting(lang);
        this.$router.go(0);
      }
    },
    exportData() {
      this.showExportDialog = true;
    },
    importData() {
      this.showImportDialog = true;
    }
  },
  watch: {},
  components: { ExportImportCard, DashboardSettings }
});
</script>

<style scoped lang="scss">
h3 {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}
hr {
  border-top: 1px double #8c8b8b;
  margin: 1em -1em;
}
.q-input {
  margin: 0 1em;
}
.lang-select {
  max-width: 200pt;
}

.col {
  margin-bottom: 1em;
}
.select-col {
  margin-left: 10vw;
  margin-right: 10vw;
}
.button-container {
  margin: 0 auto;
  padding: 1em;
  display: block;
  max-width: 300pt;
}
.button-container .q-btn,
#logout-button {
  margin: 0.5em;
}

.btn {
  margin-top: 1em;
  margin-right: 1em;
}
</style>
