import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateCompliancesFormFields } from '../form-fields';
import { StepCompanyTickerSymbols } from './stepCompanyTickSymbols';
import { StepCompliances } from './stepCompliances';
import { StepFinra } from './stepFinra';
import { StepSeniorPoliticalFigure } from './stepSeniorPoliticalFigure';
import { StepUpdate } from './stepUpdate';

export const FLOW_STEPS = [StepCompliances, StepFinra, StepSeniorPoliticalFigure, StepCompanyTickerSymbols, StepUpdate];

const [useUpdateCompliancesFlow, UpdateCompliancesFlowProvider] = createFormFlow<UpdateCompliancesFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateCompliancesFlowProvider, useUpdateCompliancesFlow };
