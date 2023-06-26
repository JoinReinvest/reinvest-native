import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImpactMetrics, KeyMetrics, Location, Poi } from 'reinvest-app-common/src/types/graphql';

import { BorderedDescription } from '../../components/BorderedDescription';
import { Button } from '../../components/Button';
import { Carousel } from '../../components/Carousel';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { Map } from '../../components/Map';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { Characteristic } from './components/Characteristic';
import { Metrics } from './components/Metrics';
import { Section } from './components/Section';
import { Update } from './components/Update';
import { propertyMock } from './types';

export const PropertyDetails = ({ route }: LogInProps<Screens.PropertyDetails>) => {
  const { property } = route.params;
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useLogInNavigation();

  const investNow = () => {
    navigate(Screens.Investing, { initialInvestment: false });
  };

  const propertyDetails = propertyMock;

  return (
    <MainWrapper
      noPadding
      isScroll
    >
      <Carousel
        items={(property.gallery as string[]) ?? []}
        title={property.name ?? ''}
      />
      <Box
        pt="16"
        flex={1}
        fw
        px="default"
        style={{ paddingBottom: bottom }}
      >
        <Button onPress={investNow}>Invest now</Button>
        <Box mt="32">
          <Metrics
            keyMetrics={property.keyMetrics as KeyMetrics}
            impactMetrics={property.impactMetrics as ImpactMetrics}
            name={property.name ?? ''}
          />
        </Box>
        <Section headline="About the Neighborhood">
          <Box my="16">
            <Map location={property.location as Location} />

            <BorderedDescription alignItems="center">
              <StyledText
                variant="bonusHeading"
                adjustsFontSizeToFit
              >
                {property.name + Object.values(property.address ?? {}).join(' ')}
              </StyledText>
            </BorderedDescription>
          </Box>
          <Box
            px="24"
            style={{ borderColor: palette.lightGray, borderWidth: 1 }}
          >
            {property.POIs?.map((poi, idx) => {
              let shouldUnderline;

              if (property?.POIs?.length) {
                shouldUnderline = property?.POIs?.length > 1 && idx !== property?.POIs?.length - 1;
              }

              return (
                <Characteristic
                  key={poi?.name}
                  poi={poi as Poi}
                  underlined={shouldUnderline}
                />
              );
            })}
          </Box>
        </Section>
        {propertyDetails.updates && (
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
