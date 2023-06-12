import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, FadeInUp, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { BorderedDescription } from '../../../components/BorderedDescription';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import type { ImpactMetrics, KeyMetrics, MetricsT } from '../types';
import { MetricSegment, type MetricT } from './MetricSegment';

const getMetrics = (metrics: KeyMetrics | ImpactMetrics): { key: MetricT; value: string | number }[] => {
  return Object.entries(metrics).map(metric => ({ key: metric[0] as MetricT, value: metric[1] }));
};

const CHEVRON_ROTATION = 180;
export const Metrics = ({ metrics, location }: PropsWithChildren<{ location: string; metrics: MetricsT }>) => {
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
      ],
    };
  });

  const toggleList = () => {
    statusSharedValue.value = isExpanded ? 0 : 1;
    setIsExpanded(prev => !prev);
    //we need to return con
  };
  const { keyMetrics, impactMetrics } = metrics;

  const openDisclaimerDialog = (key: MetricT) => {
    openDialog(<FormModalDisclaimer headline={` ${key} metric`} />);
  };

  return (
    <>
      <Row
        px="default"
        py={'16'}
        justifyContent="space-between"
        style={styles.mainPart}
      >
        <Box>
          <StyledText variant="h5">{location}</StyledText>
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
          entering={FadeInUp.duration(150)}
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
