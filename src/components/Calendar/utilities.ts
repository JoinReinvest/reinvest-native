import dayjs from 'dayjs';

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
