
// src/integrations/supabase/storage.ts

import { StorageAdapter } from '@supabase/supabase-js';

// A simple in-memory storage implementation
const memoryStorage: Record<string, string> = {};

export const customStorageAdapter: StorageAdapter = {
  getItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      return memoryStorage[key] || null;
    }
  },
  setItem: (key, value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      memoryStorage[key] = value;
    }
  },
  removeItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      delete memoryStorage[key];
    }
  },
};
