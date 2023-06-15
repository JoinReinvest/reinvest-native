import axios from 'axios';
import Config from 'react-native-config';

export const validateReferralCode = async (token: string) => {
  const { data } = await axios.post(
    `${Config.API_URL}/incentive-token`,
    { token },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (data.status) {
    return;
  }

  throw new Error('Invalid referral code');
};
