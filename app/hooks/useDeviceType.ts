"use client";

import { useEffect, useState } from "react";

type DeviceType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });
 const width = window.innerWidth;
  console.log("width,",width);
  console.log("ismobile,",device.isMobile);
  useEffect(() => {
    const updateDevice = () => {
     
      setDevice({
        isMobile: width < 768,                 
        isTablet: width >= 768 && width < 1280, 
        isDesktop: width >= 1280,               
      });
    };

    updateDevice(); 
    window.addEventListener("resize", updateDevice);

    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, [width]);

  return device;
}
