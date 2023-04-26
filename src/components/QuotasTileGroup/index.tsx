import { View } from 'react-native';

import { styles } from './styles';
import { Tile } from './Tile';
import { QuotasTileGroupProps } from './types';

export const QuotasTileGroup = ({ selectedQuota, quotas, onSelect }: QuotasTileGroupProps) => {
  return (
    <View style={[styles.row]}>
      {quotas.map(quota => (
        <Tile
          key={quota}
          id={quota}
          selected={selectedQuota === quota}
          onPress={onSelect}
        >
          {quota}
        </Tile>
      ))}
    </View>
  );
};
