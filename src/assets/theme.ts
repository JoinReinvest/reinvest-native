export const theme = {
  frostGreen: '#C1EBD9',
  frostGreen60: 'rgba(193, 235, 217, 0.6)',
  frostGreen30: 'rgba(193, 235, 217, 0.3)',
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
  darkerGray: '#D4D6DA',
  lightGray: '#E9E9E9',
  lightesGray: '#FCFCFC',
  gradientsLight: ['#D6E50', '#FFFFFF'],
  gradientsDark: ['#D6E5E0', '#11270B'],
};

export type Theme = keyof typeof theme;
