import { useState, useEffect } from "react";

// This hook is used to calculate the offsets for the video element when the video is larger than the container.
export function useOffsets(vWidth, vHeight, cWidth, cHeight) { // v = video, c = container
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (vWidth && vHeight && cWidth && cHeight) {
      const x = vWidth > cWidth
        ? Math.round((vWidth - cWidth) / 2)
        : 0;

      const y = vHeight > cHeight
        ? Math.round((vHeight - cHeight) / 2)
        : 0;

      setOffsets({ x, y });
    }
  }, [vWidth, vHeight, cWidth, cHeight]);

  return offsets;
}