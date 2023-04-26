import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { palette } from '../constants/theme';
import { Icon } from './Icon';
import { StyledText } from './typography/StyledText';

interface TableItem {
  label: string;
  onPress: () => void;
  value: string;
}

interface TableProps {
  heading: string;
  items: TableItem[];
  subheading: string;
}

export const Table = ({ heading, subheading, items }: TableProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.separator]}>
        <StyledText variant="tableHeading">{heading}</StyledText>
        <StyledText
          color="dark3"
          variant="paragraph"
        >
          {subheading}
        </StyledText>
      </View>
      <View style={{ width: '100%' }}>
        {items.map(({ label, value, onPress }, index) => (
          <Pressable
            key={label}
            style={[styles.item, index !== items.length - 1 && styles.separator]}
            onPress={onPress}
          >
            <StyledText
              variant="paragraphLarge"
              color="dark3"
            >
              {label}
            </StyledText>
            <View style={styles.iconContainer}>
              <Icon
                icon="info"
                color={palette.dark2}
              />
            </View>
            <StyledText
              variant="paragraphLarge"
              color="dark2"
            >
              {value}
            </StyledText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    rowGap: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: palette.lightGray,
    width: '100%',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  iconContainer: {
    marginRight: 'auto',
  },
});
