import React, {useMemo, useState} from 'react';
import {LayoutChangeEvent, Pressable, TextInput, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {InputProps} from './types';
import {styles} from './styles';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';

export const Input = ({
  value,
  inputStyle,
  nativeInputStyle,
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
  onBlur,
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
    if (value?.length) {
      return;
    }
    setFocusedAnimatedStyle(isFocused);
  };

  const onBlurHandler = () => {
    onBlur?.();
    stateHandler(false);
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

  const onPressFocusHandler = () => {
    inputRef?.current?.focus();
  };

  const calculateSizeHandler = ({
    nativeEvent: {
      layout: {width},
    },
  }: LayoutChangeEvent) => {
    setPlaceholderWidth(width);
  };

  const toggleShowSecureInput = () => {
    setShowSecuredInput(prev => !prev);
  };

  const rightSegment = useMemo(() => {
    if (secureTextEntry) {
      return (
        <Icon
          icon={'eyeHide'}
          onPress={toggleShowSecureInput}
          color={dark ? palette.pureWhite : palette.pureBlack}
        />
      );
    }
    return rightSection;
  }, [dark, rightSection, secureTextEntry]);

  return (
    <>
      <Pressable onPress={onPressFocusHandler} style={[styles.wrapper]}>
        <View
          style={[
            styles.input,
            focused && styles.focused,
            !!error && styles.error,
            inputStyle,
            disabled && styles.disabled,
            dark && styles.dark,
            dark && focused && styles.focusedDark,
            dark && !!error && styles.errorDark,
          ]}>
          <View />
          {leftSection}
          <View style={styles.mainSection}>
            <Animated.View
              onLayout={calculateSizeHandler}
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
                dark && styles.darkInput,
                nativeInputStyle,
                disabled && styles.nativeInputDisabled,
              ]}
              onFocus={() => {
                stateHandler(true);
              }}
              onBlur={onBlurHandler}
              {...props}
              ref={inputRef}
              value={value}
              onSubmitEditing={onSubmit}
            />
          </View>
          {rightSegment}
        </View>
      </Pressable>
      {error && (
        <StyledText
          numberOfLines={1}
          ellipsizeMode={'tail'}
          variant={'paragraphSmall'}
          style={styles.errorMessage}>
          {error}
        </StyledText>
      )}
    </>
  );
};
