import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, TextInput, View, ViewStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import Animated, { AnimatedStyleProp, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
      predefined,
      pointerEvents = 'auto',
      ...props
    },
    ref,
  ) => {
    const inputRef = useForwardRef(ref);
    const [placeholderWidth, setPlaceholderWidth] = useState(0);
    const [focused, setFocused] = useState(false);
    const [showSecuredInput, setShowSecuredInput] = useState(secureTextEntry);
    const sharedValue = useSharedValue(value ? 1 : 0);

    useEffect(() => {
      sharedValue.value = value || focused ? 1 : 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, focused]);

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

    const animatedStyle = useAnimatedStyle(
      () =>
        ({
          transform: [
            {
              translateY: withTiming(interpolate(sharedValue.value, [0, 1], [18, 6]), { duration: 200 }),
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
        } as AnimatedStyleProp<ViewStyle>),
    );

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
            color={dark ? palette.pureWhite : palette.dark3}
          />
        );
      }

      return rightSection;
    }, [dark, rightSection, secureTextEntry, showSecuredInput]);

    const getPredefinedPaddingForDropdown = useMemo(() => {
      const stringLength = value?.length || 0;

      if (stringLength > 3) {
        return { mainSection: styles.removedHorizontalPadding, input: styles.smallerPaddingRight };
      }

      if (stringLength > 2) {
        return { mainSection: styles.removeLeftPadding };
      }

      return null;
    }, [value]);

    const renderPlaceholder = () => {
      if (!placeholder || focused) {
        return maskedPlaceholder;
      }

      return '';
    };

    return (
      <>
        <Pressable
          onPress={onPressFocusHandler}
          style={[styles.wrapper, wrapperStyle]}
          pointerEvents={pointerEvents}
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
              predefined && getPredefinedPaddingForDropdown?.input,
            ]}
          >
            <View />
            {leftSection}
            <View style={[styles.mainSection, !placeholder && styles.centerText, predefined && getPredefinedPaddingForDropdown?.mainSection]}>
              {placeholder && (
                <Animated.View
                  onLayout={calculateSizeHandler}
                  style={[styles.placeholder, !!leftSection && styles.placeholderWithLeftSection, animatedStyle]}
                >
                  <StyledText
                    numberOfLines={1}
                    style={[styles.placeholderText]}
                  >
                    {placeholder}
                  </StyledText>
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
                  !!leftSection && styles.paddingWithLeftSection,
                  dark && styles.darkInput,
                  !placeholder && styles.centerText,
                  nativeInputStyle,
                  disabled && styles.nativeInputDisabled,
                  predefined && styles.predefined,
                  style,
                  (secureTextEntry || !!rightSection) && !predefined && styles.narrowInput,
                ]}
                placeholderTextColor={palette.dark3}
                onFocus={() => {
                  stateHandler(true);
                }}
                onBlur={onBlurHandler}
                placeholder={renderPlaceholder()}
                {...props}
                ref={inputRef}
                value={value}
                onSubmitEditing={onSubmit}
              />
            </View>
            <View style={[!predefined && styles.rightSegment]}>{rightSegment}</View>
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
