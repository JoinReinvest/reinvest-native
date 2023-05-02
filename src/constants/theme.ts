/*
 * To get specific opacity for colors use hexToRGB helper
 * const frostGreen30 = hexToRGB(palette.frostGreen, .3)
 */

export const palette = {
  frostGreen: '#C1EBD9',
  // frostGreen: '#6495ed',
  deepGreen: '#11270B',
  pureBlack: '#000000',
  onboarding: '#1B1B1B',
  pureWhite: '#FFFFFF',
  success: '#44CB7A',
  error: '#E50029',
  warning: '#FAC337',
  dark1: '#081224',
  dark2: '#575E6C',
  dark3: '#939AA2',
  gray: '#DDC59E',
  darkerGray: '#D4D6DA',
  darkGray: '#DDDDDD',
  lightGray: '#E9E9E9',
  lightesGray: '#FCFCFC',
  transparent: 'transparent',
};

export const gradients = {
  gradientsLight: ['#D6E5E0', '#FFFFFF'],
  headerGradient: ['#C4C4C4', '#FFF'],
  gradientsDark: ['#D6E5E0', '#11270B'],
};

type ValueOf<T> = T[keyof T];

export type ThemeValues = ValueOf<typeof palette>;

export type Theme = keyof typeof palette;
