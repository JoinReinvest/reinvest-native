import { useRef } from 'react';
import VideoRN from 'react-native-video';

import { styles } from './styles';

export const Video = () => {
  const videoRef = useRef<VideoRN>(null);

  return (
    <VideoRN
      preventsDisplaySleepDuringVideoPlayback={false}
      source={require('../../assets/welcomeScreen.mp4')}
      ref={videoRef}
      resizeMode="cover"
      repeat
      muted
      style={styles.backgroundVideo}
    />
  );
};
