import React, { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [name, setName] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return initialValue;

      const parsed = JSON.parse(saved);
      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(name));
  }, [name, key]);

  return [name, setName];
};
