import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { DarkScreenHeader } from '../../../components/CustomHeader';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { Controller } from '../../../components/typography/Controller';
import { SSN_MASK } from '../../../constants/masks';
import { palette } from '../../../constants/theme';
import { useLogInNavigation } from '../../../navigation/hooks';
import { APPLICANT_WITHOUT_IDENTIFICATION } from '../../../screens/Onboarding/schemas';
import { Applicant, OnboardingFormFields } from '../../../screens/Onboarding/types';
import { ApplicantFormFields, getDefaultValuesForApplicantWithoutIdentification, mapDomicileLabelToDomicileType } from '../../../screens/Onboarding/utilities';
import { styles } from './styles';

interface Props {
  onClose: () => void;
  onSubmit: (applicant: Applicant, applicantIndex: number | undefined) => Promise<void>;
  storeFields: OnboardingFormFields;
  applicantIndex?: number;
}

const EMPTY_APPLICANT_FORM: ApplicantFormFields = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  socialSecurityNumber: '',
  residentialAddress: '',
  domicile: undefined,
};

export const ApplicantFormModal = ({ applicantIndex, storeFields, onSubmit: onSubmitFormProps, onClose }: PropsWithChildren<Props>) => {
  const { bottom } = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useLogInNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [identificationDocument, setIdentificationDocument] = useState('');
  const defaultValues = getDefaultValuesForApplicantWithoutIdentification(storeFields, DraftAccountType.Corporate);
  const { control, formState, handleSubmit } = useForm<ApplicantFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(APPLICANT_WITHOUT_IDENTIFICATION),
    defaultValues: async () => (storeFields ? defaultValues : EMPTY_APPLICANT_FORM),
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
    if (currentStep === 0) {
      onClose();

      return;
    }

    setCurrentStep(prevStep => prevStep - 1);
  };

  const goToNextStep = () => setCurrentStep(prevStep => prevStep + 1);

  return (
    <>
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
      {!currentStep ? (
        <ScrollView style={[{ width: '100%' }]}>
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
        </ScrollView>
      ) : (
        <ScrollView style={{ width: '100%' }}>
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
        </ScrollView>
      )}
      <View
        key="buttons_section"
        style={[styles.buttonsSection, { paddingBottom: bottom }]}
      >
        <Button
          disabled={currentStep === 0 ? shouldButtonBeDisabled : !identificationDocument}
          variant="primary"
          onPress={currentStep === 0 ? goToNextStep : handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </View>
    </>
  );
};
