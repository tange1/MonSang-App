<template>
  <!-- Timeline card. Only displayed when width >= 600px. -->
  <q-card class="dashboard-card-wide gt-xs">
    <q-card-section class="card-title">
      <q-icon name="fas fa-chart-line" class="big-icon" />
      {{ $t('timeline.title') }}
    </q-card-section>
    <q-card-section>
      <q-select
        v-model="filter"
        dense
        multiple
        :options="availableAllergies"
        :option-label="
          (o) => (o ? o.languageDisplays[lang] : $t('allergy.noAllergy'))
        "
        options-dense
        use-chips
        stack-label
        :label="$t('timeline.filter')"
        @update:model-value="getChartData()"
      />
      <GChart
        type="LineChart"
        :data="chartData"
        :options="chartOptions"
        :settings="{ language: lang }"
        v-if="chartData.length > 1"
      />

      <p class="no-data-text no-data" v-if="chartData.length < 2">
        {{ $t('diary.noData') }}
      </p>
    </q-card-section>
  </q-card>
  <!-- Card to display when width is < 600px. -->
  <q-card class="dashboard-card lt-sm">
    <q-card-section class="card-title">
      <q-icon name="fas fa-chart-line" class="big-icon" />
      {{ $t('timeline.title') }}
    </q-card-section>
    <q-card-section>
      <div class="text-body1">
        {{ $t('timeline.noShowText') }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { GChart } from 'vue-google-charts';

import { DiaryEntry } from 'src/model/interfaces';
import Utils from 'src/services/utils';
import {
  AllergySystemCodeExtension,
  ALLERGY_IDENTIFICATION_CODES
} from '@i4mi/mhealth-proto-components';
import { getLangStringFromLocale } from 'src/boot/i18n';
import { SYMPTOM_LOCATIONS } from 'src/assets/symptoms';

export default defineComponent({
  name: 'TimelineCard',
  components: {
    GChart
  },
  props: {
    diary: {
      type: Array as PropType<Array<DiaryEntry>>,
      required: true
    },
    dayOffset: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      filter: new Array<AllergySystemCodeExtension>(),

      knownAllergyCodes: new Array<AllergySystemCodeExtension>(),
      suspectedAllergies: new Array<AllergySystemCodeExtension>(),
      availableAllergies: new Array<AllergySystemCodeExtension>(),

      chartData: [] as (Date | string | number | null)[][],

      chartOptions: {
        height: 400,
        legend: 'top',
        hAxis: {
          title: this.$t('timeline.xAxis'),
          format: 'dd/MM/yyyy',
          ticks: [] as Date[],
          minorGridlines: {
            count: 0
          }
        },
        vAxis: {
          title: this.$t('timeline.yAxis'),
          ticks: [
            { v: 0, f: this.$t('symptom.260413007') },
            { v: 1, f: this.$t('symptom.255604002') },
            { v: 2, f: this.$t('symptom.6736007') },
            { v: 3, f: this.$t('symptom.24484000') }
          ]
        },
        interpolateNulls: true,
        curveType: 'function',
        pointSize: 5,
        series: {
          0: { pointShape: 'circle' },
          1: { pointShape: 'triangle' },
          2: { pointShape: 'square' },
          3: { pointShape: 'diamond' },
          4: { pointShape: 'star' },
          5: { pointShape: 'polygon' }
        }
      }
    };
  },
  /**
   * Loads the known allergies and the suspected allergies.
   */
  beforeMount() {
    this.knownAllergyCodes = this.$store.getKnownAllergies().map((allergy) => {
      const sctCode = allergy.code.coding
        ? allergy.code.coding.find(
            (coding) => coding.system === 'http://snomed.info/sct'
          )
        : undefined;
      let coding = ALLERGY_IDENTIFICATION_CODES[0];
      if (sctCode && sctCode.code) {
        coding =
          ALLERGY_IDENTIFICATION_CODES.find(
            (code) => code.defaultCoding.code === sctCode.code
          ) || coding;
      }
      return coding;
    });
    this.suspectedAllergies = this.$store.getSuspectedAllergies();
  },
  /**
   * Builds the available allergies list, and processes the diary entries to display them on the graph.
   */
  mounted() {
    this.resetAvailableAllergies();
    this.getChartData();
  },
  /**
   * Processes the diary entries to display them on the graph.
   */
  updated() {
    this.getChartData();
  },
  methods: {
    /**
     * Processes the diary entries into a two dimmensional array with header that can be used by the Google Charts.
     */
    getChartData() {
      let data: (Date | string | number | null)[][] = [];
      let header: (Date | string)[] = [this.$t('timeline.date')];

      let symptomsIndexes: { [key: string]: number } = {};

      // Codes of intesities are converted to 0-3.
      let intensities = {
        260413007: 0,
        255604002: 1,
        6736007: 2,
        24484000: 3
      };

      // Builds the rest of the header with symptoms and also store their index for a later use.
      for (let i = 0; i < SYMPTOM_LOCATIONS.length; i++) {
        symptomsIndexes[SYMPTOM_LOCATIONS[i].sct] = i + 1;
        header[i + 1] = this.$t('symptom.' + SYMPTOM_LOCATIONS[i].name);
      }

      data.push(header);

      let entries = this.filterByAllergies(this.diary);
      this.buildHAxis();

      // Adds the entries to data.
      for (const e of entries) {
        let line: (Date | number | null)[] = [
          e.date,
          null,
          null,
          null,
          null,
          null,
          null
        ];
        for (const s of e.symptoms) {
          const index = symptomsIndexes[s.location.sct];
          line[index] = intensities[s.intensity];
        }
        data.push(line);
      }

      // Builds a list with the indexes of the empty columns (symptoms).
      let emptyIndex: number[] = [];
      for (let i = 1; i < SYMPTOM_LOCATIONS.length + 1; i++) {
        let empty = true;
        for (let j = 1; j < data.length; j++) {
          if (data[j][i] !== null) {
            empty = false;
          }
        }
        if (empty) {
          emptyIndex.push(i);
        }
      }

      // Removes the empty columns.
      data = data.map((x) =>
        x.filter((y, index) => emptyIndex.indexOf(index) === -1)
      );

      this.chartData = data;
    },
    /**
     * Filters the list in a way to return the entries from the specified date to the specified date minus the offset.
     * @param diaryEntries A list of entries that will be filtered.
     * @param date  The date that we will calculate the offset.
     */
    filterByDate(diaryEntries: DiaryEntry[], date: Date = new Date()) {
      date = Utils.dateTimeToDate(date);
      let dateOffsetMilliseconds = 1000 * 60 * 60 * 24 * this.dayOffset;
      let dateOffset = new Date(date);
      dateOffset.setTime(dateOffset.getTime() - dateOffsetMilliseconds);

      for (let i = 0; i < this.dayOffset + 1; i++) {
        let ms = 1000 * 60 * 60 * 24 * (this.dayOffset - i);
        let d = new Date(date);
        d.setTime(date.getTime() - ms);
        this.chartOptions.hAxis.ticks[i] = d;
      }

      diaryEntries = diaryEntries.filter(
        (x) => x.date.getTime() > dateOffset.getTime()
      );

      return diaryEntries;
    },
    /**
     * Filters the list in a way to return the entries with allergies that match those from the filter.
     * @param diaryEntries A list of entries that will be filtered.
     */
    filterByAllergies(diaryEntries: DiaryEntry[]) {
      if (this.filter.length > 0) {
        diaryEntries = diaryEntries.filter((x) =>
          this.filter.some(
            (y) => y.defaultCoding.code === x.allergy?.defaultCoding.code
          )
        );
      }
      return diaryEntries;
    },
    buildHAxis() {
      const date = Utils.dateTimeToDate(new Date());
      this.chartOptions.hAxis.ticks.length = 0;

      if (this.dayOffset === -1) {
        const months: { [key: number]: number } = {
          '-12': 0, // janvier
          '-11': 1, // février
          '-10': 2, // mars
          '-9': 3, // avril
          '-8': 4, // mai
          '-7': 5, // juin
          '-6': 6, // juillet
          '-5': 7, // août
          '-4': 8, // septembre
          '-3': 9, // octobre
          '-2': 10, // novembre
          '-1': 11, // décembre
          '0': 0, // janvier
          '1': 1, // février
          '2': 2, // mars
          '3': 3, // avril
          '4': 4, // mai
          '5': 5, // juin
          '6': 6, // juillet
          '7': 7, // août
          '8': 8, // septembre
          '9': 9, // octobre
          '10': 10, // novembre
          '11': 11 // décembre
        };
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        this.chartOptions.hAxis.ticks.length = 0;
        for (let i = currentMonth - 11; i <= currentMonth + 1; i++) {
          if (i < 0) {
            this.chartOptions.hAxis.ticks.push(
              new Date(currentYear - 1, months[i])
            );
          } else if (i === 0) {
            this.chartOptions.hAxis.ticks.push(
              new Date(currentYear, months[i], 3)
            );
          } else {
            this.chartOptions.hAxis.ticks.push(
              new Date(currentYear, months[i])
            );
          }
        }
        this.chartOptions.hAxis.format = 'MMM YYYY';
      } else if (this.dayOffset === 7) {
        for (let i = 0; i < this.dayOffset + 1; i++) {
          let ms = 1000 * 60 * 60 * 24 * (this.dayOffset - i);
          let d = new Date(date);
          d.setTime(date.getTime() - ms);
          this.chartOptions.hAxis.ticks[i] = d;
        }
        this.chartOptions.hAxis.format = 'd MMM';
      } else {
        for (let i = this.dayOffset; i > -1; i -= 2) {
          let ms = 1000 * 60 * 60 * 24 * (this.dayOffset - i);
          let d = new Date(date);
          d.setTime(date.getTime() - ms);
          this.chartOptions.hAxis.ticks.push(d);
        }
        this.chartOptions.hAxis.format = 'd MMM';
      }
    },
    resetAvailableAllergies() {
      function merge(
        arr1: AllergySystemCodeExtension[],
        arr2: AllergySystemCodeExtension[]
      ): AllergySystemCodeExtension[] {
        const arr = new Array<AllergySystemCodeExtension>();
        arr1.forEach((e1) => arr.push(e1));
        // only push when not already in array
        arr2.forEach((e2) => {
          if (
            arr1.findIndex((e1: AllergySystemCodeExtension) => {
              return e1.defaultCoding.code === e2.defaultCoding.code;
            }) === -1
          ) {
            arr.push(e2);
          }
        });
        return arr;
      }

      this.availableAllergies = merge(
        this.knownAllergyCodes,
        this.suspectedAllergies
      )
        .filter(
          (a) =>
            a.defaultCoding.display &&
            !a.defaultCoding.display.includes('No known')
        )
        .sort((a, b) =>
          (a.defaultCoding.display || '').localeCompare(
            b.defaultCoding.display || ''
          )
        );
    }
  }
});
</script>

<style scoped lang="scss">
.no-data {
  padding-top: 1em;
}
</style>
