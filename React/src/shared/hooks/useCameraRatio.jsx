import { useState, useCallback } from "react";

export function useCameraRatio(initialRatio) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio);

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isPortrait = height >= width;
      const ratio = isPortrait ? width / height : height / width; // ratio is always < 1

      setAspectRatio(ratio);
    }
  }, []);

  return [aspectRatio, calculateRatio];
}