import { useState } from "react";

function useLocalStorage(key, value) {
  const setLocalStorage = () => {
    localStorage.setItem(key, value);
  };

  const getLocalStorage = () => {
    localStorage.getItem(key);
  };

  return { setLocalStorage, getLocalStorage };
}

export default useLocalStorage;
