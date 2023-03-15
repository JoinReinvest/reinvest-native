import VideoRN from 'react-native-video';
import {styles} from './styles';
import {useRef} from 'react';

const video = require('../../assets/RotatedVideo.mov');

export const Video = () => {
  const videoRef = useRef<VideoRN>(null);
  return (
    <VideoRN
      source={video}
      ref={videoRef}
      resizeMode="cover"
      repeat
      muted
      style={styles.backgroundVideo}
    />
  );
};
