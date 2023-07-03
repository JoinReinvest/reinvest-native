import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { AddressFields } from '../form-fields';
import { AddressInfo } from './addressInfo';
import { UpdateAddress } from './updateAddress';

export const FLOW_STEPS = [AddressInfo, UpdateAddress];

const [useUpdateAddressFlow, UpdateAddressFlowProvider] = createFormFlow<AddressFields>({
  steps: FLOW_STEPS,
});

export { UpdateAddressFlowProvider, useUpdateAddressFlow };
