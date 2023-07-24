import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { CurvedTransition, Easing, FadeInUp, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ImpactMetrics, KeyMetrics } from 'reinvest-app-common/src/types/graphql';

import { BorderedDescription } from '../../../components/BorderedDescription';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { ModalInformation } from '../../../components/Modals/ModalContent/Information';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { MetricSegment, type MetricT } from './MetricSegment';

const getMetrics = (metrics: KeyMetrics | ImpactMetrics): { key: MetricT; value: string | number }[] => {
  return Object.entries(metrics).map(metric => ({ key: metric[0] as MetricT as MetricT, value: metric[1] as string | number }));
};

const CHEVRON_ROTATION = 180;

export const Metrics = ({ keyMetrics, impactMetrics, name }: PropsWithChildren<{ impactMetrics?: ImpactMetrics; keyMetrics?: KeyMetrics; name?: string }>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openDialog } = useDialog();

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
      ] as never,
    };
  });

  const toggleList = () => {
    statusSharedValue.value = isExpanded ? 0 : 1;
    setIsExpanded(prev => !prev);
  };

  const openDisclaimerDialog = (key: MetricT) => {
    openDialog(
      <ModalInformation
        heading={` ${key} metric`}
        content="lorem ipsum text to be entered here to describe what each of these terms mean"
      />,
      {
        closeIcon: false,
        animationType: 'fade',
      },
      'sheet',
    );
  };

  return (
    <>
      <Row
        px="default"
        py={'16'}
        justifyContent="space-between"
        alignItems="center"
        style={styles.mainPart}
      >
        <Box>
          <StyledText
            variant="h5"
            adjustsFontSizeToFit
          >
            {name}
          </StyledText>
          <StyledText variant="paragraph">Location</StyledText>
        </Box>
        <Box
          onPress={toggleList}
          color="frostGreen"
          height={36}
          width={36}
          radius={18}
          justifyContent="center"
          alignItems="center"
        >
          <Animated.View style={[rotationAnimationStyles]}>
            <Icon icon="arrowDown" />
          </Animated.View>
        </Box>
      </Row>
      {isExpanded && (
        <Animated.View
          entering={FadeInUp.duration(150).delay(80)}
          layout={CurvedTransition.duration(100)}
          style={styles.metrics}
        >
          <BorderedDescription px="default">
            <StyledText>Key Metrics</StyledText>
          </BorderedDescription>
          {keyMetrics &&
            getMetrics(keyMetrics).map(metric => {
              return (
                <MetricSegment
                  onPress={() => openDisclaimerDialog(metric.key)}
                  key={metric.key}
                  metric={metric}
                />
              );
            })}
          <BorderedDescription px="default">
            <StyledText>Impact Metrics</StyledText>
          </BorderedDescription>
          {impactMetrics &&
            getMetrics(impactMetrics).map(metric => {
              return (
                <MetricSegment
                  onPress={() => openDisclaimerDialog(metric.key)}
                  key={metric.key}
                  metric={metric}
                />
              );
            })}
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainPart: { borderColor: palette.lightGray, borderWidth: 1, zIndex: 50, backgroundColor: 'white' },
  metrics: { width: '100%' },
});
