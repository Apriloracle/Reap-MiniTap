// src/utils/store.ts
import { createStore } from 'tinybase';

// Create the store
const store = createStore();

// Initialize the store with a default value
store.setValue('celoAddress', '');

// Setter function for celoAddress
export const setCeloAddress = (address: string) => {
  store.setValue('celoAddress', address);
};

// Getter function for celoAddress
export const getCeloAddress = () => {
  return store.getValue('celoAddress');
};

// Add listener function
export const addCeloAddressListener = (callback: (address: string) => void) => {
  return store.addValueListener('celoAddress', () => {
    callback(store.getValue('celoAddress') as string);
  });
};

export default store;
