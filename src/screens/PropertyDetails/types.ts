const imagesMock = [
  'https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=',
  'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
  'https://img.freepik.com/premium-photo/geometric-facades-residential-building_294094-27.jpg',
  'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
];
export const propertyMock = {
  meta: {
    images: imagesMock,
    metrics: {
      keyMetrics: { projectReturn: '10%', structure: 'Equity', rating: 'A' },
      impactMetrics: { units: '10%', totalProjectSize: '-', jobsCreated: 300 },
    },
  },
  characteristics: [
    { type: 'transport', value: 'Vehicle-Dependant', info: 'Some public transit available' },
    { type: 'education', value: 'Good Schools', info: 'Good Schools and education oppertunities' },
  ],
  updates: [
    {
      author: { uri: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:53:38 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet',
        image: 'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
      },
    },
    {
      author: { uri: 'https://e7.pngegg.com/pngimages/778/849/png-clipart-computer-icons-user-login-avatar-small-icons-angle-heroes.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:52:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
      },
    },
    {
      author: { uri: 'https://e7.pngegg.com/pngimages/778/849/png-clipart-computer-icons-user-login-avatar-small-icons-angle-heroes.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:53:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
        image: 'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
      },
    },
  ],
};

export interface PropertyDetailsT {
  characteristics: CharacteristicT[];
  meta: {
    images: string[];
    metrics: { impactMetrics: ImpactMetrics; keyMetrics: KeyMetrics };
  };
  updates: UpdateT[];
}

export type CharacteristicType = 'education' | 'transport';

export type CharacteristicT = {
  info: string;
  type: 'education' | 'transport';
  value: string;
};

export type UpdateT = {
  author: { initials: string; uri: string };
  content: {
    info: string;
    image?: string;
  };
  date: string;
};

export type MetricsT = { impactMetrics: ImpactMetrics; keyMetrics: KeyMetrics };

export type KeyMetrics = { projectReturn: string; rating: string; structure: string };
export type ImpactMetrics = { jobsCreated: number; totalProjectSize: string; units: string };
