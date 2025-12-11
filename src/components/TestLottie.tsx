"use client";

import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const CustomLottie = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Player
        autoplay
        loop
        // ✅ Point to the file in your public folder
        // Note: Do not include "public" in the string, just the subfolder.
        src="/Untitled file.json"
        
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
};

export default CustomLottie;