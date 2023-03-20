import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Icon} from '@components/Icon';

const DefaultLeftHeaderColumn = () => {
  const {canGoBack, goBack} = useNavigation();
  return (
    <View style={styles.wrapper}>
      {canGoBack() && (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon icon="arrowLeft" color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DefaultLeftHeaderColumn;
