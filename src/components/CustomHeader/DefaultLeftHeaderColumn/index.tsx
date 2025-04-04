import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { palette } from '../../../constants/theme';
import { Icon } from '../../Icon';
import styles from './styles';

const DefaultLeftHeaderColumn = ({ dark = false }: { dark?: boolean }) => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.wrapper}>
      {canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Icon
            icon="down"
            style={{ transform: [{ rotate: '90deg' }] }}
            color={dark ? palette.pureWhite : palette.pureBlack}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DefaultLeftHeaderColumn;
