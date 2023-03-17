import React, {useRef, useState} from 'react';
import {TextInput, Pressable, View, Keyboard} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DropdownOption, DropdownProps} from './types';
import {styles} from './styles';
import {Icon} from '@components/Icon';
import {Input} from '@components/Input';
import {StyledText} from '@components/typography/StyledText';

export const Dropdown = ({data, onSelect, ...rest}: DropdownProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState<string>('');

  const arrowRotation = useSharedValue(0);
  const listHeight = useSharedValue(0);

  const rotationAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${arrowRotation.value}deg`, {
            duration: 100,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const expandListAnimationStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(listHeight.value, {
        duration: 150,
        easing: Easing.linear,
      }),
    };
  });

  const closeList = () => {
    inputRef.current?.blur();
    setIsListExpanded(false);
    arrowRotation.value = 0;
    listHeight.value = 0;
  };

  const toggleList = () => {
    if (!isListExpanded) {
      Keyboard.dismiss(); // hide keyboard if shown before
      inputRef.current?.focus();
      setIsListExpanded(true);
      arrowRotation.value = 180;
      listHeight.value = 203;
    }
    if (isListExpanded) {
      closeList();
    }
  };

  const handleSelect = (selectedOption: DropdownOption) => {
    setSelectedOptionValue(selectedOption.label);
    closeList();
    onSelect(selectedOption);
  };

  return (
    <View style={[styles.wrapper]}>
      <Pressable onPress={toggleList}>
        <View pointerEvents="none">
          <Input
            value={selectedOptionValue}
            onBlur={closeList}
            ref={inputRef}
            showSoftInputOnFocus={false}
            caretHidden
            rightSection={
              <Animated.View style={[rotationAnimationStyles]}>
                <Icon icon={'arrowDown'} />
              </Animated.View>
            }
            {...rest}
          />
        </View>
      </Pressable>
      <Animated.FlatList
        nestedScrollEnabled
        data={data}
        style={[styles.list, expandListAnimationStyles]}
        renderItem={({item}) => (
          <Pressable onPress={() => handleSelect(item)}>
            <StyledText variant="paragraph" style={[styles.item]}>
              {item.label}
            </StyledText>
          </Pressable>
        )}
      />
    </View>
  );
};
