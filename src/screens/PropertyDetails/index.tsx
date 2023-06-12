import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BorderedDescription } from '../../components/BorderedDescription';
import { Button } from '../../components/Button';
import { Carousel } from '../../components/Carousel';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { Map } from '../../components/Map';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { Characteristic } from './components/Characteristic';
import { Metrics } from './components/Metrics';
import { Section } from './components/Section';
import { Update } from './components/Update';
import { type PropertyDetailsT, propertyMock } from './types';

export const PropertyDetails = ({ route }: LogInProps<Screens.PropertyDetails>) => {
  const { property } = route.params;
  const { bottom } = useSafeAreaInsets();

  const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsT>();

  useEffect(() => {
    setTimeout(() => {
      setPropertyDetails(propertyMock);
    }, 1000);
  }, []);

  const investNow = () => {
    Alert.alert(`Investing ${property.name} `);
  };

  return (
    <MainWrapper
      noPadding
      isScroll
      isLoading={!propertyDetails}
    >
      <Carousel
        items={propertyDetails?.meta.images}
        title={property.name}
      />
      <Box
        pt="16"
        flex={1}
        fw
        px="default"
        style={{ paddingBottom: bottom }}
      >
        {propertyDetails?.meta.metrics && (
          <>
            <Button onPress={investNow}>Invest now</Button>
            <Box mt="32">
              <Metrics
                metrics={propertyDetails?.meta.metrics}
                location={property.address}
              />
            </Box>
          </>
        )}
        {propertyDetails && (
          <Section headline="About the Neighborhood">
            <Box my="16">
              <Map location={propertyDetails.location} />

              <BorderedDescription alignItems="center">
                <StyledText
                  variant="bonusHeading"
                  adjustsFontSizeToFit
                >
                  {property.name + property.address}
                </StyledText>
              </BorderedDescription>
            </Box>
            <Box
              px="24"
              style={{ borderColor: palette.lightGray, borderWidth: 1 }}
            >
              {propertyDetails.characteristics.map((char, idx) => {
                let shouldUnderline;

                if (propertyDetails?.characteristics?.length) {
                  shouldUnderline = propertyDetails?.characteristics?.length > 1 && idx !== propertyDetails?.characteristics?.length - 1;
                }

                return (
                  <Characteristic
                    key={char.type}
                    char={char}
                    underlined={shouldUnderline}
                  />
                );
              })}
            </Box>
          </Section>
        )}
        {propertyDetails?.updates && (
          <Section headline="Updates">
            <Box py="16">
              {propertyDetails.updates.length ? (
                propertyDetails.updates.map(update => {
                  return (
                    <Update
                      key={`${update.author.uri}${update.date}`}
                      update={update}
                    />
                  );
                })
              ) : (
                <StyledText>No updates</StyledText>
              )}
            </Box>
          </Section>
        )}
      </Box>
    </MainWrapper>
  );
};
