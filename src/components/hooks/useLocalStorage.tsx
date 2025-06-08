import { useEffect } from 'react';

/**
 * Custom React hook that synchronizes a given value to localStorage whenever it changes.
 *
 * The value is serialized to JSON and stored under the specified key.
 * If the value is an empty array, the update is skipped to avoid storing empty states unnecessarily.
 *
 * @template T - The type of the value to store in localStorage.
 * @param {string} key - The key under which the value will be stored in localStorage.
 * @param {T} value - The value to be stored and kept in sync with localStorage.
 *
 */
export default function useLocalStorage<T>(key: string, value: T): void {
  useEffect(() => {
    if (Array.isArray(value) && value.length === 0) return;

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}
