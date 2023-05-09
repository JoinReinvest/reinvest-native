import React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { palette } from '../constants/theme';
import { Box } from './Containers/Box/Box';
import { StyledText } from './typography/StyledText';

type Period = 'WEEKLY' | 'BI-WEEKLY' | 'MONTHLY' | 'QUARTERLY';

interface CalendarProps {
  autoSelectionPeriod: Period;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const Calendar = ({ autoSelectionPeriod }: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<number>(-1);
  const [autoSelectedDays, setAutoSelectedDays] = useState<number[]>([]);
  const month = months[dayjs().month()];
  const year = dayjs().year();
  const startOffset = dayjs().startOf('month').day() === 0 ? 7 : dayjs().startOf('month').day(); // Sunday is indexed as 0 by default, changing it to 7
  const daysInMonth = [...new Array(dayjs().daysInMonth() + 1).keys()].slice(1); // start with 1 not 0

  const daysInMonthWithOffset = [...new Array(startOffset - 1), ...daysInMonth];

  const selectDay = (day: number) => {
    setSelectedDay(day);

    const autoSelected: number[] = [];
    switch (autoSelectionPeriod) {
      case 'WEEKLY':
        {
          for (let i = day + 7; i <= 31; i++) {
            if (i % 7 === 0) autoSelected.push(i);
          }
        }
        break;
      case 'MONTHLY':
      case 'QUARTERLY':
      default:
        return;
    }

    setAutoSelectedDays(autoSelected);
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
            {month} {year}
          </StyledText>
        </Box>
      </Box>
      <Box
        pt="4"
        px="4"
        pb="8"
        style={[styles.container, styles.noBorderTop, styles.grid]}
      >
        {daysInMonthWithOffset.map((day, index) => (
          <Pressable
            key={index}
            style={[styles.day]}
            onPress={day === undefined ? undefined : () => selectDay(day)}
          >
            <View style={[styles.mark, selectedDay === day && styles.selected, autoSelectedDays.includes(day) && styles.autoSelected]}>
              <StyledText
                variant="h6"
                color={autoSelectedDays.includes(day) ? 'pureWhite' : 'pureBlack'}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  noBorderTop: {
    borderTopWidth: 0,
  },
  day: {
    position: 'relative',
    height: 48,
    width: '14.2%',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: palette.frostGreen,
  },
  autoSelected: {
    backgroundColor: palette.deepGreen,
    color: palette.pureWhite,
  },
  grid: {
    flexDirection: 'row',
    rowGap: 8,
    flexWrap: 'wrap',
  },
  mark: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
