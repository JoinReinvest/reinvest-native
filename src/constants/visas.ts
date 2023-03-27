import {SelectOptions} from 'reinvest-app-common/src/types/select-option';

export const VISAS = ['F-1', 'H-1B', 'L-1', 'O-1', 'G-4'];

export const lowerCaseWithoutSpacesGenerator = (value: string) =>
  value.toLowerCase().replace(/ /g, '-');

export const VISAS_AS_OPTIONS: SelectOptions = VISAS.map(visa => ({
  label: visa,
  value: lowerCaseWithoutSpacesGenerator(visa),
}));
