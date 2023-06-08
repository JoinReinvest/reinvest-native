import { PropsWithChildren, useCallback } from 'react';
import FastImage from 'react-native-fast-image';

import { PADDED_SAFE_WIDTH } from '../../constants/styles';
import { styles } from '../../screens/Education/components/BlogCard/styles';
import { Box } from '../Containers/Box/Box';

export const ImageCard = ({ children, uri, onPress }: PropsWithChildren<{ onPress: () => void; uri: string }>) => {
  const getImageDimensions = useCallback(() => {
    return { width: '100%', height: (PADDED_SAFE_WIDTH * 9) / 16 };
  }, []);

  return (
    <Box
      style={[styles.card]}
      onPress={onPress}
    >
      {uri && (
        <FastImage
          source={{ uri }}
          style={getImageDimensions()}
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
