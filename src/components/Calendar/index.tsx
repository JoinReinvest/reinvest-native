import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { palette } from '../../constants/theme';
import { Box } from '../Containers/Box/Box';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { CalendarProps } from './types';
import { getCalendarDays, getRecurringDates } from './utilities';

export const Calendar = ({ autoSelectionPeriod, onSelect }: CalendarProps) => {
  const [startingDate, setStartingDate] = useState<dayjs.Dayjs | null>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const recurringDatesRef = useRef<dayjs.Dayjs[]>([]);

  const calendarLabel = formatDate(currentDate.toDate(), 'DATE_PICKER', { currentFormat: 'DATE_PICKER' });
  const isShowingCurrentMonth = currentDate.month() === dayjs().month();
  const calendarDays = useMemo(() => getCalendarDays(currentDate), [currentDate]);

  const selectDay = (date: dayjs.Dayjs | undefined) => {
    if (!date || date.isBefore(dayjs(), 'day')) {
      return;
    }

    const autoSelectedDates = getRecurringDates(date, autoSelectionPeriod);

    recurringDatesRef.current = autoSelectedDates;
    setStartingDate(date);

    onSelect({
      startingDate: formatDate(date.toDate(), 'API'),
      recurringDates: autoSelectedDates.map(date => formatDate(date.toDate(), 'API')),
    });
  };

  const jumpBetweenMonths = () => {
    if (isShowingCurrentMonth) {
      return setCurrentDate(prevDate => prevDate.add(1, 'month'));
    }

    setCurrentDate(prevDate => prevDate.subtract(1, 'month'));
  };

  return (
    <>
      <Box style={styles.container}>
        <Box
          style={styles.labelContainer}
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
          <Icon
            icon={isShowingCurrentMonth ? 'arrowRight' : 'arrowLeft'}
            color={palette.dark2}
            onPress={jumpBetweenMonths}
          />
        </Box>
      </Box>
      <Box
        pt="4"
        px="4"
        pb="8"
        style={[styles.container, styles.noBorderTop, styles.grid]}
      >
        {calendarDays?.map((date, index) => {
          const isAutoSelected = !!recurringDatesRef.current.find(autoSelectedDate => autoSelectedDate.isSame(date));
          const isSelectedAsStartingDate = date && date.isSame(startingDate);
          const shouldBeDisabled = date?.isBefore(dayjs(), 'day');

          return (
            <Pressable
              key={index}
              style={[styles.day]}
              onPress={() => selectDay(date)}
            >
              <View style={[styles.mark, isSelectedAsStartingDate && styles.selected, isAutoSelected && styles.autoSelected]}>
                <StyledText
                  style={[isAutoSelected && styles.autoSelected, shouldBeDisabled && styles.disabled]}
                  variant="h6"
                  opacity={0.87}
                >
                  {date?.format('D')}
                </StyledText>
              </View>
            </Pressable>
          );
        })}
      </Box>
    </>
  );
};
