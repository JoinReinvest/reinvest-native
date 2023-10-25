import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'reinvest-app-common/src/types/graphql';

import { styles } from './styles';

const regionDeltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

interface Props {
  description?: string;
  location?: Location;
  title?: string;
}
export const Map = ({ location, title, description }: Props) => {
  const loc = {
    latitude: +(location?.lat ?? 0),
    longitude: +(location?.lng ?? 0),
  };

  return (
    <MapView
      provider={'google'}
      initialRegion={{ ...regionDeltas, ...loc }}
      style={styles.container}
    >
      <Marker
        coordinate={loc}
        title={title}
        description={description}
      />
    </MapView>
  );
};
