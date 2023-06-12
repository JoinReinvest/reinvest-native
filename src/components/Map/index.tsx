import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';

import { styles } from './styles';

const mock = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const regionDeltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

interface Props {
  location: Pick<Region, 'latitude' | 'longitude'>;
  description?: string;
  title?: string;
}
export const Map = ({ location = mock, title, description }: Props) => {
  return (
    <MapView
      provider={'google'}
      initialRegion={{ ...regionDeltas, ...location }}
      style={styles.container}
    >
      <Marker
        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        title={title}
        description={description}
      />
    </MapView>
  );
};
