import { BottomTabsNavigationProps } from '../../navigation/BottomTabsNavigator/types';
import Screens from '../../navigation/screens';

export interface REITScreenProps {
  navigation: BottomTabsNavigationProps<Screens.REIT>;
}

export type PropertyMock = {
  address: string;
  id: string;
  image: string;
  name: string;
  rating: string;
  returnValue: string;
};

export type Properties = PropertyMock[];

export const mock = [
  {
    id: '1',
    name: '1613 Part St',
    address: 'Kingsford, MI 49802',
    returnValue: '9%',
    rating: 'A',
    image: 'https://img.freepik.com/premium-photo/geometric-facades-residential-building_294094-27.jpg',
  },
  {
    id: '2',
    name: '1613 Part St',
    address: 'Kingsford, MI 49802',
    returnValue: '9%',
    rating: 'A',
    image: 'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
  },
  {
    id: '3',
    name: '1613 Part St',
    address: 'Kingsford, MI 49802',
    returnValue: '9%',
    rating: 'A',
    image:
      'https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=',
  },
];
