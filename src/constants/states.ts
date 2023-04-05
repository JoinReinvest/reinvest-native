import { STATES } from 'reinvest-app-common/src/constants/states';

export type StateName = (typeof STATES)[number]['name'];

export const STATE_NAMES: [StateName, ...StateName[]] = [STATES[0].name, ...STATES.slice(1).map(({ name }) => name)];
