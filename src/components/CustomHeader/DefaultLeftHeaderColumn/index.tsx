import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Icon} from '@components/Icon';
import {palette} from '@constants/theme';

const DefaultLeftHeaderColumn = ({dark}: {dark?: boolean}) => {
  const {canGoBack, goBack} = useNavigation();

  return (
    <View style={styles.wrapper}>
      {canGoBack() && (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            icon="arrowLeft"
            color={dark ? palette.pureWhite : palette.pureBlack}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DefaultLeftHeaderColumn;
