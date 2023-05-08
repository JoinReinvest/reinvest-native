import React from 'react';

import { AddBeneficiaryLayout } from './AddBeneficiaryLayout';
import { BeneficiaryCreationFlowProvider } from './steps';

export const AddBeneficiary = () => {
  return (
    <BeneficiaryCreationFlowProvider initialStoreFields={{}}>
      <AddBeneficiaryLayout shouldShowFooter={false} />
    </BeneficiaryCreationFlowProvider>
  );
};
