import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateCompliancesFormFields } from '../form-fields';
import { StepCompanyTickerSymbols } from './stepCompanyTickSymbols';
import { StepFinra } from './stepFinra';
import { StepOriginalCompliances } from './stepOriginalCompliances';
import { StepSeniorPoliticalFigure } from './stepSeniorPoliticalFigure';
import { StepUpdate } from './stepUpdate';
import { StepUpdateCompliances } from './stepUpdateCompliances';

export const FLOW_STEPS = [StepOriginalCompliances, StepUpdateCompliances, StepFinra, StepSeniorPoliticalFigure, StepCompanyTickerSymbols, StepUpdate];

const [useUpdateCompliancesFlow, UpdateCompliancesFlowProvider] = createFormFlow<UpdateCompliancesFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateCompliancesFlowProvider, useUpdateCompliancesFlow };
