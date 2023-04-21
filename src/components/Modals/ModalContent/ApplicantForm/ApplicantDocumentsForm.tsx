import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../components/Button';
import { FilePicker } from '../../../../components/FilePicker';
import { FormTitle } from '../../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../../components/PaddedScrollView';
import { styles } from '../styles';
import { ApplicantFormStepProps } from './types';

export const ApplicantDocumentsForm = ({ isVisible, onContinue }: ApplicantFormStepProps) => {
  const [identificationDocument, setIdentificationDocument] = useState('');

  const shouldButtonBeDisabled = !identificationDocument;

  return (
    <View
      pointerEvents={isVisible ? 'auto' : 'none'}
      style={[styles.fw, !isVisible ? { height: 0, opacity: 0 } : { height: '100%', opacity: 1 }]}
    >
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
      <Button
        disabled={shouldButtonBeDisabled}
        variant="primary"
        onPress={() => onContinue({ identificationDocument })}
      >
        Continue
      </Button>
    </View>
  );
};
