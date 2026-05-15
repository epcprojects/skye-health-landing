import React from "react";

const CheckIcon = ({ fill = "#1FA2B8", height="9",width="13" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.3527 7.61296L0 4.26026L1.38673 2.87353L4.73943 6.22623L11.0309 0L12.4176 1.38673L4.73905 9L3.35232 7.61327L3.3527 7.61296Z"
        fill={fill}
      />
    </svg>
  );
};

export default CheckIcon;
