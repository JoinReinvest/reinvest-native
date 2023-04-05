import { API_URL } from '@env';
import axios from 'axios';

export const validateReferralCode = async (token: string) => {
  const { data } = await axios.post(
    `${API_URL}/incentive-token`,
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
