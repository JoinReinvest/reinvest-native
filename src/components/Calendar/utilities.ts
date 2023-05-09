import dayjs from 'dayjs';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';

import { Period } from '../../types/period';
export const selectDatesForAutoSelection = (day: number, period: Period) => {
  const daysInMonth = dayjs().daysInMonth();
  const PERIOD_TO_DAYS = {
    WEEKLY: 7,
    'BI-WEEKLY': 14,
    MONTHLY: daysInMonth,
    QUARTERLY: daysInMonth, // no need to calculate days count for quarterly period because it will not be shown for user in calendar
  };

  const autoSelectedDays = [];

  for (let i = day; i <= daysInMonth; i += PERIOD_TO_DAYS[period]) {
    if (i === day) {
      // do not auto select day that was already selected by the user
      continue;
    }

    autoSelectedDays.push(i);
  }

  return autoSelectedDays;
};

export const getCalendarDays = () => {
  const daysInMonth = [...new Array(dayjs().daysInMonth() + 1).keys()].slice(1); // start with 1 not 0
  const firstWeekOffset = dayjs().startOf('month').day() === 0 ? 7 : dayjs().startOf('month').day(); // Sunday is indexed as 0 by default, changing it to 7 to fit calendar layout

  // fill current month days with days from previous month to start current month at right day position
  const daysInMonthWithOffset = [...new Array(firstWeekOffset - 1), ...daysInMonth];

  return daysInMonthWithOffset;
};

export const formatDayToDate = (...days: number[]) => {
  const month = `${dayjs().month() + 1}`.padStart(2, '0');
  const year = dayjs().year();

  return days.map(day => {
    const formattedDay = `${day}`.padStart(2, '0');

    return formatDateForApi(`${year}-${month}-${formattedDay}`);
  });
};
