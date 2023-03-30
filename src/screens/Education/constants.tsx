import { ChartIcon } from '@components/Icon/icons/EducationIcons/ChartIcon';
import { HomeIcon } from '@components/Icon/icons/EducationIcons/HomeIcon';
import { EducationCardProps } from '@screens/Education/components/EducationCard/types';

export const URL = {
  forgot_password: '/forgot-password',
  terms_conditions: '/terms-and-conditions',
  privacy_policy: '/privacy-policy',
  education: '/education',
  faq: '/education/faq',
  glossary: 'glossary-iframe',
  calculator: 'calculator-iframe',
};

export const educationCards: EducationCardProps[] = [
  {
    title: 'Commercial Real Estate Underwriting Calculator',
    subtitle: 'Calculate your underwriting income in a few easy steps',
    buttonLabel: 'View Calculator',
    uri: URL.calculator,
    icon: <HomeIcon />,
  },
  {
    title: 'Real Estate 101 Glossary',
    subtitle: 'Equip yourself with the language of the industry',
    icon: <ChartIcon />,
    buttonLabel: 'View Glossary',
    uri: URL.glossary,
  },
];
