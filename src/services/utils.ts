import { DiaryEntry } from 'src/model/interfaces';

function dateTimeToDate(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Filters the list in a way to return the entries from the specified date to the specified date minus the offset.
 * @param diaryEntries A list of entries that will be filtered.
 * @param date  The date that we will calculate the offset.
 */
function filterByDate(
  diaryEntries: DiaryEntry[],
  dayOffset: number,
  date: Date = new Date()
): DiaryEntry[] {
  if (dayOffset !== -1) {
    date = dateTimeToDate(date);
    const dateOffsetMilliseconds = 1000 * 60 * 60 * 24 * dayOffset;
    const dateOffset = new Date(date);
    dateOffset.setTime(dateOffset.getTime() - dateOffsetMilliseconds);

    diaryEntries = diaryEntries.filter(
      (x) => x.date.getTime() > dateOffset.getTime()
    );
    return diaryEntries;
  } else {
    return [...diaryEntries];
  }
}

export default {
  dateTimeToDate,
  filterByDate
};
