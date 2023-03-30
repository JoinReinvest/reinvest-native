/*
  Because of the problem with persisting session , we should use non deprecated @react-native-community/async-storage instead amplify default
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { type KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { ICognitoStorage } from 'amazon-cognito-identity-js';

const MEMORY_KEY_PREFIX = '@fcAuth:';
let dataMemory: Record<string, string | null> = {};
const syncPromise: Promise<string[]> | null = null;

/**
 * This is used to set a specific item in storage
 */
function setItem(key: string, value: string) {
  AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value);
  dataMemory[`${key}`] = value;

  return dataMemory[`${key}`];
}

/**
 * This is used to get a specific key from storage
 */
function getItem(key: string) {
  if (!Object.prototype.hasOwnProperty.call(dataMemory, key)) {
    return null;
  }

  return dataMemory[`${key}`] ?? null;
}

/**
 * This is used to remove an item from storage
 */
function removeItem(key: string) {
  AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key);

  return delete dataMemory[`${key}`];
}

/**
 * This is used to clear the storage
 */
function clear() {
  dataMemory = {};

  return dataMemory;
}

/**
 * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
 */
async function sync() {
  if (!syncPromise) {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const memoryKeys = keys.filter((key: string) => key.startsWith(MEMORY_KEY_PREFIX));

      const stores: readonly KeyValuePair[] = await AsyncStorage.multiGet(memoryKeys);

      stores.map((store: [string, string | null]) => {
        const key = store[0];
        const value = store[1];
        const memoryKey = key.replace(MEMORY_KEY_PREFIX, '');

        dataMemory[`${memoryKey}`] = value;
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }

  return syncPromise;
}

export const AuthStorage: ICognitoStorage & {
  sync: () => Promise<string[] | null>;
} = {
  setItem,
  getItem,
  removeItem,
  clear,
  sync,
};
