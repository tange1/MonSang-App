<template>
  <q-option-group
    v-model="values"
    :options="options"
    type="toggle"
    @update:model-value="updateDashboardSettings"
  />
</template>

<script lang="ts">
'@babel/types';
import { defineComponent } from 'vue';
import { QOptionGroupProps } from 'quasar';
import { DashboardComponent } from 'src/model/interfaces';

export default defineComponent({
  name: 'DashboardSettings',
  data() {
    return {
      dashboardOptions: this.$store.getDashboardSettings(),
      values: [] as DashboardComponent[],
      options: [] as QOptionGroupProps['options']
    };
  },
  created() {
    this.values = [];
    this.options = [];
    for (const o of this.dashboardOptions) {
      o.active && this.values.push(o.component);
      this.options?.push({
        label: this.$t('settings.' + o.component),
        value: o.component
      });
    }
  },
  methods: {
    updateDashboardSettings(values: DashboardComponent[]) {
      this.$store.setDashboardSettings(values);
      this.$emit('dashboardSettingsChanged');
    }
  }
});
</script>

<style scoped lang="scss"></style>
