import { NODE_ENV } from '@env';

export const isStaging = NODE_ENV === 'staging';
