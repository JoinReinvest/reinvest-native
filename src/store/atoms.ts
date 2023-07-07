import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

export { useAtom, useSetAtom } from 'jotai';
export { RESET } from 'jotai/utils';

const storage = createJSONStorage<AccountOverview>(() => AsyncStorage);
export const currentAccount = atomWithStorage<AccountOverview>('currentAccount', {}, storage);

export const unreadNotificationsCount = atom(0);

export const signedOut = atom(false);
