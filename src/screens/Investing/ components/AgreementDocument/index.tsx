import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubscriptionAgreement, SubscriptionAgreementSection } from 'reinvest-app-common/src/types/graphql';

import { Box } from '../../../../components/Containers/Box/Box';
import { Icon } from '../../../../components/Icon';
import { PaddedScrollView } from '../../../../components/PaddedScrollView';
import { StyledText } from '../../../../components/typography/StyledText';
import { palette } from '../../../../constants/theme';

export const AgreementDetails = ({ agreement }: { agreement: SubscriptionAgreement }) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <PaddedScrollView
      style={{ paddingTop: top, paddingBottom: bottom }}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      {agreement.content.map((section, idx) => {
        return (
          <AgreementSection
            key={`${section.header}+${idx}`}
            section={section}
          />
        );
      })}
      <StyledText></StyledText>
    </PaddedScrollView>
  );
};

export const AgreementSection = ({ section }: { section: SubscriptionAgreementSection }) => {
  return (
    <>
      <Box py={'8'}>
        <StyledText
          variant={'h6'}
          key={section.header}
        >
          {section.header}
        </StyledText>
      </Box>
      {section.paragraphs.map(({ lines, bold, isCheckedOption }, idx) => {
        if (lines.length) {
          return (
            <Box key={`${lines[0]?.substring(0, -4)} + ${idx}`}>
              {lines.map(line => {
                return (
                  <Box
                    key={line.substring(0, 14)}
                    py={'4'}
                  >
                    <StyledText variant={bold ? 'h6' : 'paragraph'}>{line}</StyledText>
                  </Box>
                );
              })}
              {typeof isCheckedOption === 'boolean' && <CheckBox isChecked={isCheckedOption} />}
            </Box>
          );
        }

        return null;
      })}
    </>
  );
};

export const CheckBox = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <Box
      radius={4}
      color="lightGray"
      alignSelf={'flex-start'}
    >
      <Icon
        icon={isChecked ? 'tick' : 'hamburgerClose'}
        color={isChecked ? palette.success : palette.dark3}
      />
    </Box>
  );
};
