import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { View } from 'react-native';

import { EMPTY_APPLICANT_FORM } from '../../../../constants/applicants';
import { isIOS } from '../../../../constants/common';
import { palette } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import { Applicant } from '../../../../screens/Onboarding/types';
import { ApplicantFormFields, mapDomicileLabelToDomicileType } from '../../../../screens/Onboarding/utilities';
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
  applicantId?: string;
  applicantIndex?: number;
  isKYC?: boolean;
}

export const ApplicantFormModal = ({ applicantIndex, applicantId, onSubmit, onClose, defaultValues, isKYC = false }: PropsWithChildren<Props>) => {
  const route = useRoute();
  const navigation = useLogInNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const applicantRef = useRef<ApplicantFormFields>(defaultValues ?? EMPTY_APPLICANT_FORM);

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

  const onContinue = async (fields: ApplicantFormFields) => {
    applicantRef.current = { ...applicantRef.current, ...fields, id: applicantId };

    if (currentStep === 2) {
      await onSubmit({ ...applicantRef.current, domicile: mapDomicileLabelToDomicileType(applicantRef.current.domicile) }, applicantIndex);

      return onClose();
    }

    return goToNextStep();
  };

  const dismissSearch = () => setIsSearchDialogOpen(false);

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
      <Box style={{ flex: 1 }}>
        <ApplicantGeneralForm
          onContinue={onContinue}
          isVisible={currentStep === 0}
          defaultValues={defaultValues}
          isKYC={isKYC}
        />
        <ApplicantAddressForm
          isVisible={currentStep === 1}
          isSearchDialogOpen={isSearchDialogOpen}
          onSearchIconPress={() => setIsSearchDialogOpen(true)}
          onContinue={onContinue}
          dismissSearchDialog={dismissSearch}
          defaultValues={defaultValues}
        />
        <ApplicantDocumentsForm
          isVisible={currentStep === 2}
          onContinue={onContinue}
          defaultValues={defaultValues}
        />
      </Box>
      <TermsFooter
        noPadding={!isIOS}
        dark
      />
    </>
  );
};
