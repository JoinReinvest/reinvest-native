import React, { forwardRef, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, TextInput, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { palette } from '../../constants/theme';
import { useForwardRef } from '../../hooks/useForwardRef';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import type { InputProps } from './types';

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      inputStyle,
      wrapperStyle,
      nativeInputStyle,
      onSubmit,
      error,
      disabled,
      numberOfLines = 1,
      leftSection,
      placeholder,
      maskedPlaceholder,
      dark,
      rightSection,
      secureTextEntry,
      onBlur,
      style,
      ...props
    },
    ref,
  ) => {
    const inputRef = useForwardRef(ref);
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
          translateY: withTiming(interpolate(sharedValue.value, [0, 1], [10, 0]), { duration: 200 }),
        },
        {
          translateX: withTiming(interpolate(sharedValue.value, [0, 1], [0, (-placeholderWidth / 2) * 0.2]), { duration: 200 }),
        },
        {
          scale: withTiming(interpolate(sharedValue.value, [0, 1], [1, 0.8]), {
            duration: 200,
          }),
        },
      ],
    }));

    const onPressFocusHandler = () => {
      inputRef.current?.focus();
    };

    const calculateSizeHandler = ({
      nativeEvent: {
        layout: { width },
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
            icon={!showSecuredInput ? 'eyeHide' : 'eyeVisible'}
            onPress={toggleShowSecureInput}
            color={dark ? palette.pureWhite : palette.pureBlack}
          />
        );
      }

      return rightSection;
    }, [dark, rightSection, secureTextEntry, showSecuredInput]);

    return (
      <>
        <Pressable
          onPress={onPressFocusHandler}
          style={[styles.wrapper, wrapperStyle]}
        >
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
            ]}
          >
            <View />
            {leftSection}
            <View style={[styles.mainSection, !placeholder && styles.centerText]}>
              {placeholder && (
                <Animated.View
                  onLayout={calculateSizeHandler}
                  style={[styles.placeholder, animatedStyle]}
                >
                  <StyledText style={[styles.placeholderText]}>{placeholder}</StyledText>
                </Animated.View>
              )}
              <MaskInput
                clearTextOnFocus={false}
                secureTextEntry={showSecuredInput}
                selectionColor={dark ? palette.pureWhite : palette.pureBlack}
                editable={!disabled}
                allowFontScaling={false}
                numberOfLines={numberOfLines}
                style={[
                  styles.nativeInput,
                  dark && styles.darkInput,
                  !placeholder && styles.centerText,
                  nativeInputStyle,
                  disabled && styles.nativeInputDisabled,
                  style,
                ]}
                placeholderTextColor={dark ? palette.dark3 : undefined}
                onFocus={() => {
                  stateHandler(true);
                }}
                onBlur={onBlurHandler}
                placeholder={focused ? maskedPlaceholder : undefined}
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
            ellipsizeMode="tail"
            variant="paragraphSmall"
            style={styles.errorMessage}
          >
            {error}
          </StyledText>
        )}
      </>
    );
  },
);
