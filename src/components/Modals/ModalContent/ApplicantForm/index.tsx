import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { View } from 'react-native';

import { isIOS } from '../../../../constants/common';
import { palette } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import { Applicant } from '../../../../screens/Onboarding/types';
import { ApplicantFormFields } from '../../../../screens/Onboarding/utilities';
import { Box } from '../../../Containers/Box/Box';
import { DarkScreenHeader } from '../../../CustomHeader';
import { Icon } from '../../../Icon';
import { TermsFooter } from '../../../TermsFooter';
import { styles } from '../styles';
import { ApplicantAddressForm } from './ApplicantAddressForm';
import { ApplicantDocumentsForm } from './ApplicantDocumentsForm';
import { ApplicantGeneralForm } from './ApplicantGeneralForm';

interface Props {
  defaultValues: ApplicantFormFields;
  onClose: () => void;
  onSubmit: (applicant: Applicant, applicantIndex: number | undefined) => Promise<void>;
  applicantIndex?: number;
}

export const ApplicantFormModal = ({ applicantIndex, onSubmit, onClose, defaultValues }: PropsWithChildren<Props>) => {
  const route = useRoute();
  const navigation = useLogInNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const applicantRef = useRef<Applicant>({});

  const handleGoBack = () => {
    if (isSearchDialogOpen) {
      setIsSearchDialogOpen(false);

      return;
    }

    if (!currentStep) {
      onClose();

      return;
    }

    setCurrentStep(prevStep => prevStep - 1);
  };

  const goToNextStep = () => setCurrentStep(prevStep => prevStep + 1);

  const onContinue = async (fields: Applicant) => {
    applicantRef.current = { ...applicantRef.current, ...fields };

    if (currentStep === 2) {
      await onSubmit(applicantRef.current, applicantIndex);

      return;
    }

    return goToNextStep();
  };

  return (
    <>
      <View style={styles.headerWrapper}>
        <DarkScreenHeader
          options={{
            headerLeft: () => (
              <Icon
                color={palette.pureWhite}
                icon={'down'}
                style={{ transform: [{ rotate: '90deg' }] }}
                onPress={handleGoBack}
              />
            ),
            title: 'logo',
          }}
          route={route}
          navigation={navigation}
        />
      </View>
      <Box
        mt={isIOS ? '56' : '12'}
        style={{ flex: 1 }}
      >
        <>
          <ApplicantGeneralForm
            onContinue={onContinue}
            isVisible={currentStep === 0}
            defaultValues={defaultValues}
          />
          <ApplicantAddressForm
            isVisible={currentStep === 1}
            isSearchDialogOpen={isSearchDialogOpen}
            onSearchIconPress={() => setIsSearchDialogOpen(true)}
            onContinue={onContinue}
            defaultValues={defaultValues}
          />
          <ApplicantDocumentsForm
            isVisible={currentStep === 2}
            onContinue={onContinue}
          />
        </>
      </Box>
      <TermsFooter noPadding={!isIOS} />
    </>
  );
};
