"use client";

import { AlertIcon, ShoppingCartIcon } from "@/public/icons";
import { toast } from "react-toastify";

export const toastAlert = (
  message: string,
  isSuccess: boolean,
  duration: number = 3000,
) => {
  const toastConfig = {
    position: "top-right" as const,
    icon: (
      <ShoppingCartIcon fill="white" classname="w-4.5 h-4.5 lg:w-6 lg:h-6" />
    ),
    closeButton: false,
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      width: "260px",
      minHeight: "44px",
      padding: "12px 16px",
      color: "#111827",
    },
  };

  if (isSuccess) {
    toast.success(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        backgroundColor: "#16A34A",
        color: "white",
      },
    });
  } else {
    toast.error(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        backgroundColor: "#FEF3F2",
        color: "red",
      },
      icon: <AlertIcon />,
    });
  }
};
