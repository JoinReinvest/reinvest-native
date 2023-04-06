import { zodResolver } from '@hookform/resolvers/zod';
import { BOOLEAN_OPTIONS } from 'constants/booleanOptions';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { RadioButtonGroup } from '../../../components/RadioButtonGroup';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

interface Fields {
  isAccreditedInvestor: boolean | undefined;
}

const schema = z.object({
  isAccreditedInvestor: z.boolean(),
});

export const StepAccreditedInvestor: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCREDITED_INVESTOR,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const storedValue = storeFields.isAccreditedInvestor;
    const defaultValues: Fields = { isAccreditedInvestor: storedValue };
    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const { openDialog } = useDialog();

    const shouldButtonBeDisabled = watch('isAccreditedInvestor') !== undefined;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ isAccreditedInvestor: fields.isAccreditedInvestor });
      moveToNextStep();
    };

    const watchedAccreditedInvestor = watch('isAccreditedInvestor');

    const handleOpenDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline={'What is an accredited investor?'}
          content="CONTENT"
        />,
      );
    };

    const selectedValue = watchedAccreditedInvestor ? (watchedAccreditedInvestor ? 'yes' : 'false') : undefined;

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Are you an accredited investor?"
            link="What is an accredited investor?"
            onLinkPress={handleOpenDialog}
          />
          <RadioButtonGroup
            selectedValue={selectedValue}
            onSelect={val => setValue('isAccreditedInvestor', val === 'yes' ? true : false)}
            options={BOOLEAN_OPTIONS}
          />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
