import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { DarkScreenHeader } from '../../../components/CustomHeader';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { TermsFooter } from '../../../components/TermsFooter';
import { Controller } from '../../../components/typography/Controller';
import { isIOS } from '../../../constants/common';
import { SSN_MASK } from '../../../constants/masks';
import { palette } from '../../../constants/theme';
import { useLogInNavigation } from '../../../navigation/hooks';
import { APPLICANT_WITHOUT_IDENTIFICATION } from '../../../screens/Onboarding/schemas';
import { Applicant } from '../../../screens/Onboarding/types';
import { ApplicantFormFields, mapDomicileLabelToDomicileType } from '../../../screens/Onboarding/utilities';
import { styles } from './styles';

interface Props {
  defaultValues: ApplicantFormFields;
  onClose: () => void;
  onSubmit: (applicant: Applicant, applicantIndex: number | undefined) => Promise<void>;
  applicantIndex?: number;
}

export const ApplicantFormModal = ({ applicantIndex, onSubmit: onSubmitFormProps, onClose, defaultValues }: PropsWithChildren<Props>) => {
  const route = useRoute();
  const navigation = useLogInNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [identificationDocument, setIdentificationDocument] = useState('');

  const { control, formState, handleSubmit } = useForm<ApplicantFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(APPLICANT_WITHOUT_IDENTIFICATION),
    defaultValues,
  });

  const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

  const onSubmit: SubmitHandler<ApplicantFormFields> = async fields => {
    const applicant: Applicant = {
      ...fields,
      domicile: mapDomicileLabelToDomicileType(fields.domicile),
      identificationDocument,
    };

    await onSubmitFormProps(applicant, applicantIndex);
  };

  const handleGoBack = () => {
    if (!currentStep) {
      onClose();

      return;
    }

    setCurrentStep(prevStep => prevStep - 1);
  };

  const goToNextStep = () => setCurrentStep(prevStep => prevStep + 1);

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
        {!currentStep ? (
          <PaddedScrollView style={styles.fw}>
            <FormTitle
              dark
              headline="Enter the following information for your applicant."
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="firstName"
              inputProps={{ placeholder: 'First Name', dark: true }}
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="middleName"
              inputProps={{ placeholder: 'Middle Name (Optional)', dark: true }}
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="lastName"
              inputProps={{ placeholder: 'Last Name', dark: true }}
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="dateOfBirth"
              inputProps={{ placeholder: 'Date of birth', maskedPlaceholder: 'MM/DD/YYYY', dark: true, mask: Masks.DATE_MMDDYYYY }}
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="socialSecurityNumber"
              inputProps={{ placeholder: 'SSN', maskedPlaceholder: '000-00-0000', dark: true, mask: SSN_MASK }}
            />
            <Controller
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="residentialAddress"
              inputProps={{ placeholder: 'Residential Address', dark: true }}
            />
            <Controller
              type="dropdown"
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              fieldName="domicile"
              dropdownProps={{
                placeholder: 'Domicile',
                dark: true,
                data: RESIDENCY_STATUS_OPTIONS,
                defaultValue: defaultValues?.domicile,
              }}
            />
          </PaddedScrollView>
        ) : (
          <PaddedScrollView style={styles.fw}>
            <FormTitle
              dark
              headline="Upload the ID of your applicant."
            />
            <FilePicker
              dark
              label="Upload Files"
              onSelect={res => setIdentificationDocument(res[0]?.uri ?? '')}
              type="single"
            />
          </PaddedScrollView>
        )}
      </Box>
      <Button
        disabled={currentStep === 0 ? shouldButtonBeDisabled : !identificationDocument}
        variant="primary"
        onPress={currentStep === 0 ? goToNextStep : handleSubmit(onSubmit)}
      >
        Continue
      </Button>
      <TermsFooter noPadding={!isIOS} />
    </>
  );
};
