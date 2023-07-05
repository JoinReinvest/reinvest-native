import React from 'react';

import { UpdateEmploymentDetailsFlowProvider } from './steps';
import { UpdateEmploymentDetailsLayout } from './UpdateEmploymentDetailsLayout';

export const UpdateEmploymentDetails = () => {
  return (
    <UpdateEmploymentDetailsFlowProvider initialStoreFields={{}}>
      <UpdateEmploymentDetailsLayout />
    </UpdateEmploymentDetailsFlowProvider>
  );
};
