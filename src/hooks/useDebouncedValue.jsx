import { useState, useEffect } from "react";

function useDebouncedValue(value, time = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouncedValue;
}

export default useDebouncedValue;
