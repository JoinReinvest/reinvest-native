import { ComponentProps } from 'react';
import FastImage from 'react-native-fast-image';

import { Box } from '../Containers/Box/Box';
import { styles } from './styles';

interface Props extends ComponentProps<typeof Box> {
  onPress: () => void;
  uri?: string;
}

export const ImageCard = ({ children, uri, onPress, style }: Props) => {
  return (
    <Box
      style={[styles.card, style]}
      onPress={onPress}
    >
      {uri && (
        <FastImage
          source={{ uri }}
          style={styles.image}
        />
      )}
      <Box
        style={styles.description}
        px="16"
        py="12"
        fw
      >
        {children}
      </Box>
    </Box>
  );
};
