import * as SecureStore from 'expo-secure-store';

// Save data to SecureStore
export const saveData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} saved successfully!`);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

// Retrieve data from SecureStore
export const getData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

// Clear data from SecureStore
export const clearData = async () => {
  try {
    await SecureStore.deleteItemAsync('email');
    await SecureStore.deleteItemAsync('password');
    console.log('User data cleared successfully!');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
