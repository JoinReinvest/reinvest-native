import React, { forwardRef, useRef, useState } from 'react';
import { FlatList, Keyboard, LayoutRectangle, Modal, Pressable, TextInput, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SelectOption } from 'reinvest-app-common/src/types/select-option';

import { palette } from '../../constants/theme';
import { useForwardRef } from '../../hooks/useForwardRef';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { DropdownProps } from './types';

const LIST_HEIGHT = 191;
const CHEVRON_ROTATION = 180;

export const Dropdown = forwardRef<TextInput, DropdownProps>(({ prefix, data, onSelect, style, dark, value, ...rest }, ref) => {
  const inputRef = useForwardRef(ref);
  const wrapperRef = useRef<View>(null);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [position, setPosition] = useState<LayoutRectangle | undefined>();
  const statusSharedValue = useSharedValue(0);

  const rotationAnimationStyles = useAnimatedStyle(() => {
    const rotation = interpolate(statusSharedValue.value, [0, 1], [0, CHEVRON_ROTATION]);

    return {
      transform: [
        {
          rotate: withTiming(`${rotation}deg`, {
            duration: 100,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const expandListAnimationStyles = useAnimatedStyle(() => {
    const height = interpolate(statusSharedValue.value, [0, 1], [0, LIST_HEIGHT]);

    return {
      height: withTiming(height, {
        duration: 150,
        easing: Easing.linear,
      }),
    };
  });

  const closeList = () => {
    setIsListExpanded(false);
    statusSharedValue.value = 0;
    //we need to return con
    setTimeout(() => {
      inputRef.current?.blur();
    }, 50);
  };

  const openList = () => {
    Keyboard.dismiss(); // hide keyboard if shown before
    inputRef.current?.focus();

    // Getting proper position for displaying list
    wrapperRef.current?.measureInWindow((x, y, width, height) => setPosition({ x, y, width, height }));

    setIsListExpanded(true);
    statusSharedValue.value = 1;
  };

  const toggleList = () => {
    if (!isListExpanded) {
      openList();
    }

    if (isListExpanded) {
      closeList();
    }
  };

  const handleSelect = (selectedOption: SelectOption) => {
    onSelect?.(selectedOption);
    closeList();
  };

  const rightSection = (
    <Animated.View style={[rotationAnimationStyles]}>
      <Icon
        icon={'arrowDown'}
        color={dark ? palette.pureWhite : undefined}
      />
    </Animated.View>
  );

  return (
    <>
      <View
        ref={wrapperRef}
        style={[styles.wrapper, style]}
      >
        <Pressable onPress={toggleList}>
          <View pointerEvents="none">
            <Input
              dark={dark}
              ref={inputRef}
              showSoftInputOnFocus={false}
              caretHidden={true}
              rightSection={rightSection}
              value={prefix ? `${prefix}${value}` : value}
              {...rest}
            />
          </View>
        </Pressable>
      </View>
      {isListExpanded && (
        <Modal transparent>
          <Pressable
            onPress={closeList}
            style={[styles.listWrapper]}
          >
            {position && (
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    top: position?.y + position.height - 12,
                    left: position.x,
                    width: position.width,
                  },
                  expandListAnimationStyles,
                ]}
              >
                <FlatList
                  style={[styles.list]}
                  nestedScrollEnabled
                  disableScrollViewPanResponder
                  keyExtractor={item => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleSelect(item)}>
                      <StyledText
                        variant="paragraph"
                        style={[styles.item]}
                      >
                        {item.label}
                      </StyledText>
                    </Pressable>
                  )}
                />
              </Animated.View>
            )}
          </Pressable>
        </Modal>
      )}
    </>
  );
});
