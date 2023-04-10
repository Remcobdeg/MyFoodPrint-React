import React, { useRef, useState } from 'react';
import { useUserMedia } from '../../shared/hooks/useUserMedia';

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
};

function Camera() {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  return (
    <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
  );
} 

export default Camera;