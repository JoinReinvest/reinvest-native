interface CountryWithCallingCode {
  readonly callingCode: string;
  readonly country: string;
}

const sortCountriesByCallingCode = (currentCountry: CountryWithCallingCode, nextCountry: CountryWithCallingCode) => {
  const currentCountryCallingCode = parseInt(currentCountry.callingCode, 10);
  const nextCountryCallingCode = parseInt(nextCountry.callingCode, 10);

  return currentCountryCallingCode - nextCountryCallingCode;
};

const filterCountriesWithUniqueCallingCodes = (country: CountryWithCallingCode, index: number, countries: typeof COUNTRIES_WITH_CALLING_CODES) => {
  const indexInCountries = countries.findIndex(({ callingCode }) => callingCode === country.callingCode);

  return indexInCountries === index;
};

export const COUNTRIES_WITH_CALLING_CODES = [
  {
    country: 'AG',
    callingCode: '1',
  },
  {
    country: 'AI',
    callingCode: '1',
  },
  {
    country: 'AS',
    callingCode: '1',
  },
  {
    country: 'BB',
    callingCode: '1',
  },
  {
    country: 'BM',
    callingCode: '1',
  },
  {
    country: 'BS',
    callingCode: '1',
  },
  {
    country: 'CA',
    callingCode: '1',
  },
  {
    country: 'DM',
    callingCode: '1',
  },
  {
    country: 'DO',
    callingCode: '1',
  },
  {
    country: 'GD',
    callingCode: '1',
  },
  {
    country: 'GU',
    callingCode: '1',
  },
  {
    country: 'JM',
    callingCode: '1',
  },
  {
    country: 'KN',
    callingCode: '1',
  },
  {
    country: 'KY',
    callingCode: '1',
  },
  {
    country: 'LC',
    callingCode: '1',
  },
  {
    country: 'MP',
    callingCode: '1',
  },
  {
    country: 'MS',
    callingCode: '1',
  },
  {
    country: 'PR',
    callingCode: '1',
  },
  {
    country: 'SX',
    callingCode: '1',
  },
  {
    country: 'TC',
    callingCode: '1',
  },
  {
    country: 'TT',
    callingCode: '1',
  },
  {
    country: 'US',
    callingCode: '1',
  },
  {
    country: 'VC',
    callingCode: '1',
  },
  {
    country: 'VG',
    callingCode: '1',
  },
  {
    country: 'VI',
    callingCode: '1',
  },
  {
    country: 'KZ',
    callingCode: '7',
  },
  {
    country: 'RU',
    callingCode: '7',
  },
  {
    country: 'EG',
    callingCode: '20',
  },
  {
    country: 'ZA',
    callingCode: '27',
  },
  {
    country: 'GR',
    callingCode: '30',
  },
  {
    country: 'NL',
    callingCode: '31',
  },
  {
    country: 'BE',
    callingCode: '32',
  },
  {
    country: 'FR',
    callingCode: '33',
  },
  {
    country: 'ES',
    callingCode: '34',
  },
  {
    country: 'HU',
    callingCode: '36',
  },
  {
    country: 'IT',
    callingCode: '39',
  },
  {
    country: 'VA',
    callingCode: '39',
  },
  {
    country: 'RO',
    callingCode: '40',
  },
  {
    country: 'CH',
    callingCode: '41',
  },
  {
    country: 'AT',
    callingCode: '43',
  },
  {
    country: 'GB',
    callingCode: '44',
  },
  {
    country: 'GG',
    callingCode: '44',
  },
  {
    country: 'IM',
    callingCode: '44',
  },
  {
    country: 'JE',
    callingCode: '44',
  },
  {
    country: 'DK',
    callingCode: '45',
  },
  {
    country: 'SE',
    callingCode: '46',
  },
  {
    country: 'NO',
    callingCode: '47',
  },
  {
    country: 'SJ',
    callingCode: '47',
  },
  {
    country: 'PL',
    callingCode: '48',
  },
  {
    country: 'DE',
    callingCode: '49',
  },
  {
    country: 'PE',
    callingCode: '51',
  },
  {
    country: 'MX',
    callingCode: '52',
  },
  {
    country: 'CU',
    callingCode: '53',
  },
  {
    country: 'AR',
    callingCode: '54',
  },
  {
    country: 'BR',
    callingCode: '55',
  },
  {
    country: 'CL',
    callingCode: '56',
  },
  {
    country: 'CO',
    callingCode: '57',
  },
  {
    country: 'VE',
    callingCode: '58',
  },
  {
    country: 'MY',
    callingCode: '60',
  },
  {
    country: 'AU',
    callingCode: '61',
  },
  {
    country: 'CC',
    callingCode: '61',
  },
  {
    country: 'CX',
    callingCode: '61',
  },
  {
    country: 'ID',
    callingCode: '62',
  },
  {
    country: 'PH',
    callingCode: '63',
  },
  {
    country: 'NZ',
    callingCode: '64',
  },
  {
    country: 'SG',
    callingCode: '65',
  },
  {
    country: 'TH',
    callingCode: '66',
  },
  {
    country: 'JP',
    callingCode: '81',
  },
  {
    country: 'KR',
    callingCode: '82',
  },
  {
    country: 'VN',
    callingCode: '84',
  },
  {
    country: 'CN',
    callingCode: '86',
  },
  {
    country: 'TR',
    callingCode: '90',
  },
  {
    country: 'IN',
    callingCode: '91',
  },
  {
    country: 'PK',
    callingCode: '92',
  },
  {
    country: 'AF',
    callingCode: '93',
  },
  {
    country: 'LK',
    callingCode: '94',
  },
  {
    country: 'MM',
    callingCode: '95',
  },
  {
    country: 'IR',
    callingCode: '98',
  },
  {
    country: 'SS',
    callingCode: '211',
  },
  {
    country: 'EH',
    callingCode: '212',
  },
  {
    country: 'MA',
    callingCode: '212',
  },
  {
    country: 'DZ',
    callingCode: '213',
  },
  {
    country: 'TN',
    callingCode: '216',
  },
  {
    country: 'LY',
    callingCode: '218',
  },
  {
    country: 'GM',
    callingCode: '220',
  },
  {
    country: 'SN',
    callingCode: '221',
  },
  {
    country: 'MR',
    callingCode: '222',
  },
  {
    country: 'ML',
    callingCode: '223',
  },
  {
    country: 'GN',
    callingCode: '224',
  },
  {
    country: 'CI',
    callingCode: '225',
  },
  {
    country: 'BF',
    callingCode: '226',
  },
  {
    country: 'NE',
    callingCode: '227',
  },
  {
    country: 'TG',
    callingCode: '228',
  },
  {
    country: 'BJ',
    callingCode: '229',
  },
  {
    country: 'MU',
    callingCode: '230',
  },
  {
    country: 'LR',
    callingCode: '231',
  },
  {
    country: 'SL',
    callingCode: '232',
  },
  {
    country: 'GH',
    callingCode: '233',
  },
  {
    country: 'NG',
    callingCode: '234',
  },
  {
    country: 'TD',
    callingCode: '235',
  },
  {
    country: 'CF',
    callingCode: '236',
  },
  {
    country: 'CM',
    callingCode: '237',
  },
  {
    country: 'CV',
    callingCode: '238',
  },
  {
    country: 'ST',
    callingCode: '239',
  },
  {
    country: 'GQ',
    callingCode: '240',
  },
  {
    country: 'GA',
    callingCode: '241',
  },
  {
    country: 'CG',
    callingCode: '242',
  },
  {
    country: 'CD',
    callingCode: '243',
  },
  {
    country: 'AO',
    callingCode: '244',
  },
  {
    country: 'GW',
    callingCode: '245',
  },
  {
    country: 'IO',
    callingCode: '246',
  },
  {
    country: 'AC',
    callingCode: '247',
  },
  {
    country: 'SC',
    callingCode: '248',
  },
  {
    country: 'SD',
    callingCode: '249',
  },
  {
    country: 'RW',
    callingCode: '250',
  },
  {
    country: 'ET',
    callingCode: '251',
  },
  {
    country: 'SO',
    callingCode: '252',
  },
  {
    country: 'DJ',
    callingCode: '253',
  },
  {
    country: 'KE',
    callingCode: '254',
  },
  {
    country: 'TZ',
    callingCode: '255',
  },
  {
    country: 'UG',
    callingCode: '256',
  },
  {
    country: 'BI',
    callingCode: '257',
  },
  {
    country: 'MZ',
    callingCode: '258',
  },
  {
    country: 'ZM',
    callingCode: '260',
  },
  {
    country: 'MG',
    callingCode: '261',
  },
  {
    country: 'RE',
    callingCode: '262',
  },
  {
    country: 'YT',
    callingCode: '262',
  },
  {
    country: 'ZW',
    callingCode: '263',
  },
  {
    country: 'NA',
    callingCode: '264',
  },
  {
    country: 'MW',
    callingCode: '265',
  },
  {
    country: 'LS',
    callingCode: '266',
  },
  {
    country: 'BW',
    callingCode: '267',
  },
  {
    country: 'SZ',
    callingCode: '268',
  },
  {
    country: 'KM',
    callingCode: '269',
  },
  {
    country: 'SH',
    callingCode: '290',
  },
  {
    country: 'TA',
    callingCode: '290',
  },
  {
    country: 'ER',
    callingCode: '291',
  },
  {
    country: 'AW',
    callingCode: '297',
  },
  {
    country: 'FO',
    callingCode: '298',
  },
  {
    country: 'GL',
    callingCode: '299',
  },
  {
    country: 'GI',
    callingCode: '350',
  },
  {
    country: 'PT',
    callingCode: '351',
  },
  {
    country: 'LU',
    callingCode: '352',
  },
  {
    country: 'IE',
    callingCode: '353',
  },
  {
    country: 'IS',
    callingCode: '354',
  },
  {
    country: 'AL',
    callingCode: '355',
  },
  {
    country: 'MT',
    callingCode: '356',
  },
  {
    country: 'CY',
    callingCode: '357',
  },
  {
    country: 'AX',
    callingCode: '358',
  },
  {
    country: 'FI',
    callingCode: '358',
  },
  {
    country: 'BG',
    callingCode: '359',
  },
  {
    country: 'LT',
    callingCode: '370',
  },
  {
    country: 'LV',
    callingCode: '371',
  },
  {
    country: 'EE',
    callingCode: '372',
  },
  {
    country: 'MD',
    callingCode: '373',
  },
  {
    country: 'AM',
    callingCode: '374',
  },
  {
    country: 'BY',
    callingCode: '375',
  },
  {
    country: 'AD',
    callingCode: '376',
  },
  {
    country: 'MC',
    callingCode: '377',
  },
  {
    country: 'SM',
    callingCode: '378',
  },
  {
    country: 'UA',
    callingCode: '380',
  },
  {
    country: 'RS',
    callingCode: '381',
  },
  {
    country: 'ME',
    callingCode: '382',
  },
  {
    country: 'XK',
    callingCode: '383',
  },
  {
    country: 'HR',
    callingCode: '385',
  },
  {
    country: 'SI',
    callingCode: '386',
  },
  {
    country: 'BA',
    callingCode: '387',
  },
  {
    country: 'MK',
    callingCode: '389',
  },
  {
    country: 'CZ',
    callingCode: '420',
  },
  {
    country: 'SK',
    callingCode: '421',
  },
  {
    country: 'LI',
    callingCode: '423',
  },
  {
    country: 'FK',
    callingCode: '500',
  },
  {
    country: 'BZ',
    callingCode: '501',
  },
  {
    country: 'GT',
    callingCode: '502',
  },
  {
    country: 'SV',
    callingCode: '503',
  },
  {
    country: 'HN',
    callingCode: '504',
  },
  {
    country: 'NI',
    callingCode: '505',
  },
  {
    country: 'CR',
    callingCode: '506',
  },
  {
    country: 'PA',
    callingCode: '507',
  },
  {
    country: 'PM',
    callingCode: '508',
  },
  {
    country: 'HT',
    callingCode: '509',
  },
  {
    country: 'BL',
    callingCode: '590',
  },
  {
    country: 'GP',
    callingCode: '590',
  },
  {
    country: 'MF',
    callingCode: '590',
  },
  {
    country: 'BO',
    callingCode: '591',
  },
  {
    country: 'GY',
    callingCode: '592',
  },
  {
    country: 'EC',
    callingCode: '593',
  },
  {
    country: 'GF',
    callingCode: '594',
  },
  {
    country: 'PY',
    callingCode: '595',
  },
  {
    country: 'MQ',
    callingCode: '596',
  },
  {
    country: 'SR',
    callingCode: '597',
  },
  {
    country: 'UY',
    callingCode: '598',
  },
  {
    country: 'BQ',
    callingCode: '599',
  },
  {
    country: 'CW',
    callingCode: '599',
  },
  {
    country: 'TL',
    callingCode: '670',
  },
  {
    country: 'NF',
    callingCode: '672',
  },
  {
    country: 'BN',
    callingCode: '673',
  },
  {
    country: 'NR',
    callingCode: '674',
  },
  {
    country: 'PG',
    callingCode: '675',
  },
  {
    country: 'TO',
    callingCode: '676',
  },
  {
    country: 'SB',
    callingCode: '677',
  },
  {
    country: 'VU',
    callingCode: '678',
  },
  {
    country: 'FJ',
    callingCode: '679',
  },
  {
    country: 'PW',
    callingCode: '680',
  },
  {
    country: 'WF',
    callingCode: '681',
  },
  {
    country: 'CK',
    callingCode: '682',
  },
  {
    country: 'NU',
    callingCode: '683',
  },
  {
    country: 'WS',
    callingCode: '685',
  },
  {
    country: 'KI',
    callingCode: '686',
  },
  {
    country: 'NC',
    callingCode: '687',
  },
  {
    country: 'TV',
    callingCode: '688',
  },
  {
    country: 'PF',
    callingCode: '689',
  },
  {
    country: 'TK',
    callingCode: '690',
  },
  {
    country: 'FM',
    callingCode: '691',
  },
  {
    country: 'MH',
    callingCode: '692',
  },
  {
    country: 'KP',
    callingCode: '850',
  },
  {
    country: 'HK',
    callingCode: '852',
  },
  {
    country: 'MO',
    callingCode: '853',
  },
  {
    country: 'KH',
    callingCode: '855',
  },
  {
    country: 'LA',
    callingCode: '856',
  },
  {
    country: 'BD',
    callingCode: '880',
  },
  {
    country: 'TW',
    callingCode: '886',
  },
  {
    country: 'MV',
    callingCode: '960',
  },
  {
    country: 'LB',
    callingCode: '961',
  },
  {
    country: 'JO',
    callingCode: '962',
  },
  {
    country: 'SY',
    callingCode: '963',
  },
  {
    country: 'IQ',
    callingCode: '964',
  },
  {
    country: 'KW',
    callingCode: '965',
  },
  {
    country: 'SA',
    callingCode: '966',
  },
  {
    country: 'YE',
    callingCode: '967',
  },
  {
    country: 'OM',
    callingCode: '968',
  },
  {
    country: 'PS',
    callingCode: '970',
  },
  {
    country: 'AE',
    callingCode: '971',
  },
  {
    country: 'IL',
    callingCode: '972',
  },
  {
    country: 'BH',
    callingCode: '973',
  },
  {
    country: 'QA',
    callingCode: '974',
  },
  {
    country: 'BT',
    callingCode: '975',
  },
  {
    country: 'MN',
    callingCode: '976',
  },
  {
    country: 'NP',
    callingCode: '977',
  },
  {
    country: 'TJ',
    callingCode: '992',
  },
  {
    country: 'TM',
    callingCode: '993',
  },
  {
    country: 'AZ',
    callingCode: '994',
  },
  {
    country: 'GE',
    callingCode: '995',
  },
  {
    country: 'KG',
    callingCode: '996',
  },
  {
    country: 'UZ',
    callingCode: '998',
  },
] as const;

type CallingCode = (typeof COUNTRIES_WITH_CALLING_CODES)[number]['callingCode'];

export const CALLING_CODES: [CallingCode, ...CallingCode[]] = [
  COUNTRIES_WITH_CALLING_CODES[0].callingCode,
  ...COUNTRIES_WITH_CALLING_CODES.slice(1).map(({ callingCode }) => callingCode),
];

export const UNIQUE_COUNTRIES_CALLING_CODES = COUNTRIES_WITH_CALLING_CODES.filter((country, index) =>
  filterCountriesWithUniqueCallingCodes(country, index, COUNTRIES_WITH_CALLING_CODES),
);
export const SORTED_COUNTRIES_CALLING_CODES = UNIQUE_COUNTRIES_CALLING_CODES.sort(sortCountriesByCallingCode);
