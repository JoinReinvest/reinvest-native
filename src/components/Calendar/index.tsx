import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Box } from '../Containers/Box/Box';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { CalendarProps } from './types';
import { formatDayToDate, getCalendarDays, selectDatesForAutoSelection } from './utilities';

export const Calendar = ({ autoSelectionPeriod, onSelect }: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<number>(-1);
  const [autoSelectedDays, setAutoSelectedDays] = useState<number[]>([]);

  const calendarLabel = formatDate(dayjs().toDate(), 'DATE_PICKER', { currentFormat: 'DATE_PICKER' });
  // const calendarLabel = 'May';
  const today = +dayjs().format('D');
  const calendarDays = useMemo(() => getCalendarDays(), []);

  const selectDay = (day: number | undefined) => {
    if (!day || day < today) {
      return;
    }

    const startingDate = formatDayToDate(day)[0];

    if (!startingDate) {
      return;
    }

    setSelectedDay(day);

    const recurringDays = selectDatesForAutoSelection(day, autoSelectionPeriod);
    setAutoSelectedDays(recurringDays);

    onSelect({
      startingDate,
      recurringDates: formatDayToDate(...recurringDays),
    });
  };

  const getDayColor = (day: number) => {
    if (autoSelectedDays.includes(day)) {
      return 'pureWhite';
    }

    if (day < today) {
      return 'darkerGray';
    }

    return 'pureBlack';
  };

  return (
    <>
      <Box style={styles.container}>
        <Box
          py="12"
          px="24"
        >
          <StyledText
            variant="paragraphEmp"
            color="pureBlack"
            opacity={0.6}
          >
            {calendarLabel}
          </StyledText>
        </Box>
      </Box>
      <Box
        pt="4"
        px="4"
        pb="8"
        style={[styles.container, styles.noBorderTop, styles.grid]}
      >
        {calendarDays.map((day, index) => (
          <Pressable
            key={index}
            style={[styles.day]}
            onPress={() => selectDay(day)}
          >
            <View style={[styles.mark, selectedDay === day && styles.selected, autoSelectedDays.includes(day) && styles.autoSelected]}>
              <StyledText
                variant="h6"
                color={getDayColor(day)}
                opacity={0.87}
              >
                {day}
              </StyledText>
            </View>
          </Pressable>
        ))}
      </Box>
    </>
  );
};
