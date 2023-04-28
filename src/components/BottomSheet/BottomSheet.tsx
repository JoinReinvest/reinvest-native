import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';

import { Box } from '../Containers/Box/Box';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';

export interface StyledBottomSheetProps {
  dark?: boolean;
  snapPoints?: string[];
  title?: string;
}

export interface BottomSheetHandle {
  close: () => void;
  collapse: () => void;
  dismiss: () => void;
  expand: () => void;
  forceClose: () => void;
  present: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: number) => void;
}

export const StyledBottomSheet = forwardRef<BottomSheetHandle, PropsWithChildren<StyledBottomSheetProps>>(
  ({ children, snapPoints = ['CONTENT_HEIGHT'], title, dark = false }, bottomSheetHandle) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(bottomSheetHandle, () => ({
      present: () => bottomSheetModalRef.current?.present(),
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      close: () => bottomSheetModalRef.current?.close(),
      forceClose: () => bottomSheetModalRef.current?.forceClose(),
      expand: () => bottomSheetModalRef.current?.expand(),
      collapse: () => bottomSheetModalRef.current?.collapse(),
      snapToIndex: (index: number) => bottomSheetModalRef.current?.snapToIndex(index),
      snapToPosition: (position: number) => bottomSheetModalRef.current?.snapToPosition(position),
    }));

    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPoints);

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetModalRef}
        style={[styles.bottomSheet, styles.shadow, dark && styles.dark]}
        handleIndicatorStyle={[styles.handleIndicatorStyle, dark && styles.handleDark]}
        handleStyle={[dark && styles.dark]}
        backdropComponent={renderBackdrop}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView
          style={[dark && styles.dark]}
          onLayout={handleContentLayout}
        >
          <>
            {title && (
              <>
                <Box
                  color={dark ? 'onboarding' : 'pureWhite'}
                  pb={'12'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <StyledText
                    color={!dark ? 'pureBlack' : 'pureWhite'}
                    variant={'bonusHeading'}
                  >
                    {title}
                  </StyledText>
                </Box>
                <View
                  key={'separator'}
                  style={[styles.titleSeparator, dark && styles.separatorDark]}
                />
              </>
            )}
            {children}
          </>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
