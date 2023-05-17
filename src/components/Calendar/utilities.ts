import dayjs from 'dayjs';

import { Period } from './types';

const MAX_DAYS_IN_TWO_MONTHS = 62;

export const getRecurringDates = (startingDate: dayjs.Dayjs, period: Period) => {
  const daysInMonth = dayjs().daysInMonth();
  const PERIOD_TO_DAYS = {
    WEEKLY: 7,
    'BI-WEEKLY': 14,
    MONTHLY: daysInMonth,
    QUARTERLY: daysInMonth,
  };

  const autoSelectedDays = [];
  const startingDateDay = +startingDate.format('D');

  for (let i = PERIOD_TO_DAYS[period]; i < MAX_DAYS_IN_TWO_MONTHS - startingDateDay; i += PERIOD_TO_DAYS[period]) {
    autoSelectedDays.push(startingDate.add(i, 'days'));
  }

  return autoSelectedDays;
};

export const getCalendarDays = (date: dayjs.Dayjs) => {
  const datesInMonth: dayjs.Dayjs[] = [];
  const startOfMonthDate = dayjs(`${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-01`);

  for (let i = 0; i < dayjs().daysInMonth(); i++) {
    datesInMonth.push(startOfMonthDate.add(i, 'days'));
  }

  const daysInMonth = [...new Array(date.daysInMonth() + 1).keys()].map(day => dayjs(`${date.year()}-${date.month() + 1}-${day}`)).slice(1); // start with 1 not 0

  const firstWeekOffset = date.startOf('month').day() === 0 ? 7 : date.startOf('month').day(); // Sunday is indexed as 0 by default, changing it to 7 to fit calendar layout

  // fill current month days with days from previous month to start current month at right day position
  return [...new Array(firstWeekOffset - 1), ...daysInMonth];
};
