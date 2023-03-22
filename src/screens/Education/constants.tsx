import {EducationCardProps} from '@screens/Education/components/EducationCard/types';
import {ChartIcon} from '@components/Icon/icons/EducationIcons/ChartIcon';
import {HomeIcon} from '@components/Icon/icons/EducationIcons/HomeIcon';
import {BlogCardProps} from '@screens/Education/components/BlogCard/types';

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

const src =
  'https://images.unsplash.com/photo-1599580506193-fef9dc35b205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXJpfGVufDB8fDB8fA%3D%3D&w=1000&q=80';
export const blogPostsMOck = [
  {
    data: 'test',
    slug: 'test',
    title: 'test',
    image: {
      height: 150,
      src: src,
    },
  },
  {
    data: 'test22',
    slug: 'test',
    title: '22',
    image: {
      height: 200,
      src: src,
    },
  },
  {
    data: 'Additional one ',
    slug: 'testddddd',
    title: 'Additional test',
    image: {
      height: 100,
      src: src,
    },
  },
] as BlogCardProps[];

export const blogPosts = [
  {
    title: 'Lorem ipsum',
    data: '2022-07-08',
    slug: 'lorem-ipsum',
    image: {
      src: 'https://images.ctfassets.net/xr96g1ou9hin/7wFasOtkwFYqWURhbiksH9/84b02324b7c536c4411f4e6c66552057/pexels-cottonbro-studio-3205991_1.jpg',
      width: 2880,
      height: 1202,
      alt: 'Why REINVEST',
      name: 'Why REINVEST',
    },
  },
  {
    title: 'Article about sth',
    data: '2020-07-28',
    slug: 'article-about-sth',
    image: {
      src: 'https://images.ctfassets.net/xr96g1ou9hin/7ghc2PFW6whvuYqLYoZDvR/2932d988a66a2dbbb297911b93f023fc/Rectangle_375.png',
      width: 399,
      height: 262,
      alt: 'Invest Article 2',
      name: 'Invest Article 2',
    },
  },
  {
    title: 'Test article',
    data: '2023-03-07',
    slug: 'test-article',
    image: {
      src: 'https://images.ctfassets.net/xr96g1ou9hin/VnKP9Nubf6SozpScfyeCh/917dbf417dba0a72fab1f8bfe384867e/Rectangle_340.png',
      width: 2316,
      height: 1338,
      alt: 'video image',
      name: 'video image',
    },
  },
] as BlogCardProps[];
