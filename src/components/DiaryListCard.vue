<template>
    <q-card class="dashboard-card diary-list-card">
      <q-card-section class="card-title">
        <q-icon name="fas fa-book" class="big-icon"/>
        {{$t('index.diaryTitle')}}
      </q-card-section>
      <q-card-section>
        <p class="intro-text">{{$t('index.diaryText')}}</p>
        <p v-if="diary.length === 0" class="no-data-text">
          {{ $t('diary.noData') }}
        </p>
        <ul class="diary-entries">
          <li v-for="entry, index in diaryEntries" :key="'diaryEntry.' + index">
            <div class="diary-entry-button"
                @click="$emit('selected-entry', entry)">
                <p class="diary-entry-button-title">
                  {{ $t('diary.title') }}
                </p>
                <p class="diary-entry-button-date">
                  {{new Intl.DateTimeFormat($i18n.locale, { dateStyle: 'medium', timeStyle: 'short'}).format(entry.date)}}
                </p>
            </div>
          </li>
        </ul>
        <ul class="diary-pages" v-if="diaryPages > 1">
          <li v-for="page in diaryPages" :key="'pagebutton'+page">
            <span @click="() => setDiaryPage(page)"
                  :class="page === currentDiaryPage ? 'clickable current-page' : 'clickable'">
              &nbsp;{{page}}&nbsp;
            </span>
            <span v-if="page !== diaryPages">•</span>

          </li>
        </ul>
      </q-card-section>

      <hr  />
      <q-card-actions align="center" class="card-actions">
        <q-btn :label="$t('diary.createTitle')"
              @click="$emit('request-new-entry')" />
      </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DiaryEntry} from '../model/interfaces';

/**
 * Component to create or display a diary entry
 */
export default defineComponent({
  name: 'DiaryListCard',
  components: { },
  data() {
    return {
      diaryEntries: new Array<DiaryEntry>(),
      diaryPages: 0,
      currentDiaryPage: 0
    }
  },
  /**
   *
   */
  emits: {
    /**
     * Notify parent about new created entry.
     */
    'selected-entry': (payload: DiaryEntry) => {
      return payload.date !== undefined;
    },
    /**
     * Tell parent to open create new entry modal.
     */
    'request-new-entry': () => {
      return true;
    },
  },
  props: {
    /**
     * A diary entry to display. If not provided, component goes to 'create entry' mode.
     */
    diary: {
      type: Array as PropType<Array<DiaryEntry>>,
      required: true
    },
    /**
     * Defines how many entries are displayed per page.
     */
    entriesPerPage: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.setDiaryPage(1);
    this.diaryPages = Math.ceil(this.$props.diary.length / this.$props.entriesPerPage);
  },
  watch: {
    diary(newDiary: DiaryEntry[]) {
      this.diaryEntries = newDiary;
      this.setDiaryPage(-1);
    }
  },
  methods: {
    setDiaryPage(page: number): void {
      this.diaryPages = Math.ceil(this.$props.diary.length / this.$props.entriesPerPage);
      this.currentDiaryPage = (page === -1)
        ? this.diaryPages
        : page;
      const start = (this.currentDiaryPage - 1) * this.$props.entriesPerPage;
      this.diaryEntries =this.$props.diary.slice(start, start + this.$props.entriesPerPage);
    }
  }
});
</script>

<style scoped lang="scss">
.diary-list-card {
  text-align: center;
}
.diary-entries, .diary-pages {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.diary-entries {
  margin-top: 1.5em;
}
.diary-pages li {
  display: inline;
}
.current-page {
  font-weight: bold;
}
hr {
  border-width: 0;
  border-top: 1px dotted $lightGray;
}
.diary-entry-button {
  border: 1px solid $text;
  border-radius: 4pt;
  margin: 0.8em auto;
  padding: 0.5em 1em;
  width: 60%;
  cursor: pointer;
}
.diary-entry-button:hover {
  background-color: $lightGray;
}
.diary-entry-button p {
  margin: 0;
  text-align: center;
}
.diary-entry-button-title {
  font-size: 0.9em;
}
.diary-entry-button-date {
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
}
.intro-text {
  margin: 1em;
}
</style>
