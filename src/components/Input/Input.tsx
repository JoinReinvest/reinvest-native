import React, {useMemo, useState} from 'react';
import {Pressable, TextInput, TouchableOpacity, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {InputProps} from './input.types';
import styles from './Input.styles';
import {StyledText} from '@components/typography/StyledText/StyledText';
import {palette} from '@assets/theme';
import {EyeHide} from '@assets/icons';
import {defaultHitSlop} from '@constants/common';

export const Input = ({
  value,
  onChange,
  inputStyle,
  onSubmit,
  error,
  disabled,
  inputRef,
  numberOfLines = 1,
  leftSection,
  placeholder,
  dark,
  rightSection,
  secureTextEntry,
  ...props
}: InputProps) => {
  const [placeholderWidth, setPlaceholderWidth] = useState(0);
  const [focused, setFocused] = useState(false);
  const [showSecuredInput, setShowSecuredInput] = useState(secureTextEntry);
  const sharedValue = useSharedValue(value ? 1 : 0);

  const setFocusedAnimatedStyle = (isFocused: boolean) => {
    'worklet';

    sharedValue.value = isFocused ? 1 : 0;
  };

  const stateHandler = (isFocused: boolean) => {
    setFocused(isFocused);
    if (value.length) {
      return;
    }
    setFocusedAnimatedStyle(isFocused);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          interpolate(sharedValue.value, [0, 1], [10, 0]),
          {duration: 200},
        ),
      },
      {
        translateX: withTiming(
          interpolate(
            sharedValue.value,
            [0, 1],
            [0, (-placeholderWidth / 2) * 0.2],
          ),
          {duration: 200},
        ),
      },
      {
        scale: withTiming(interpolate(sharedValue.value, [0, 1], [1, 0.8]), {
          duration: 200,
        }),
      },
    ],
  }));

  const rightSegment = useMemo(() => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          onPress={() => setShowSecuredInput(prev => !prev)}
          hitSlop={defaultHitSlop}>
          <EyeHide color={dark ? palette.pureWhite : palette.pureBlack} />
        </TouchableOpacity>
      );
    }
    return rightSection;
  }, [dark, rightSection, secureTextEntry]);

  return (
    <Pressable
      onPress={() => inputRef?.current?.focus()}
      style={[styles.wrapper]}>
      <View
        style={[
          styles.input,
          focused && styles.focused,
          !!error && styles.error,
          disabled && styles.disabled,
        ]}>
        <View />
        {leftSection}
        <View style={styles.mainSection}>
          <Animated.View
            onLayout={({
              nativeEvent: {
                layout: {width},
              },
            }) => {
              setPlaceholderWidth(width);
            }}
            style={[styles.placeholder, animatedStyle]}>
            <StyledText style={[styles.placeholderText]}>
              {placeholder}
            </StyledText>
          </Animated.View>
          <TextInput
            clearTextOnFocus={false}
            secureTextEntry={showSecuredInput}
            selectionColor={dark ? palette.pureWhite : palette.pureBlack}
            editable={!disabled}
            allowFontScaling={false}
            numberOfLines={numberOfLines}
            style={[
              styles.nativeInput,
              dark && styles.dark,
              inputStyle,
              disabled && styles.nativeInputDisabled,
            ]}
            onFocus={() => {
              stateHandler(true);
            }}
            onBlur={() => stateHandler(false)}
            ref={inputRef}
            value={value}
            onChange={event => onChange(event.nativeEvent.text)}
            onSubmitEditing={onSubmit}
            {...props}
          />
        </View>
        {rightSegment}
      </View>
      {error && (
        <StyledText
          numberOfLines={1}
          ellipsizeMode={'tail'}
          variant={'paragraphSmall'}
          style={styles.errorMessage}>
          {error}
        </StyledText>
      )}
    </Pressable>
  );
};
