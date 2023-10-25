export const options = [
  {
    name: 'isAssociatedWithFinra',
    description:
      'Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or\n' +
      'greater) of the equity, associated with a FINRA member, organization, or the SEC.',
  },
  {
    name: 'isAssociatedWithPubliclyTradedCompany',
    description:
      'Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?',
  },
  {
    name: 'isSeniorPoliticalFigure',
    description: 'Are you or any of your immediate family a senior political figure?',
  },
  {
    name: 'doNoneApply',
    description: ' None of the above apply',
  },
] as const;
