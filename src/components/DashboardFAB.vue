<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="fas fa-cog" color="accent">
      <q-popup-proxy :offset="[0, 10]">
        <q-banner class="q-mx-sm">
          <div class="text-h6">{{ $t('dashboardFAB.title') }}</div>
          <div class="text-subtitle1">{{ $t('dashboardFAB.entriesText') }}</div>
          <q-option-group
            v-model="offset"
            :options="[
              { label: $t('dashboardFAB.allEntries'), value: -1 },
              { label: $t('dashboardFAB.last30days'), value: 30 },
              { label: $t('dashboardFAB.last7days'), value: 7 }
            ]"
            @update:model-value="offsetChanged"
          >
          </q-option-group>
          <div class="text-subtitle1">
            {{ $t('dashboardFAB.componentsText') }}
          </div>
          <DashboardSettings
            @dashboardSettingsChanged="$emit('dashboardSettingsChanged')"
          />
        </q-banner>
      </q-popup-proxy>
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardSettings from './DashboardSettings.vue';

export default defineComponent({
  name: 'DashboardFAB',
  components: { DashboardSettings },
  data() {
    return {
      offset: this.$store.getDaysDisplayedOnDashboard()
    };
  },
  methods: {
    offsetChanged(value: number) {
      this.$store.setDaysDisplayedOnDashboard(value);
      this.$emit('offsetChanged');
    }
  }
});
</script>

<style scoped lang="scss"></style>
