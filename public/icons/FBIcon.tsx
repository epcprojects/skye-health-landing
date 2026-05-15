import React from "react";

const FBIcon = ({ fill = "#104584" }) => {
  return (
    <svg
      width="11"
      height="19"
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.49291 10.4841H6.76268V18.6384H3.12237V10.4841H0.137324V7.13502H3.12237V4.55041C3.12237 1.63816 4.86972 2.6226e-05 7.52714 2.6226e-05C8.80125 2.6226e-05 10.1482 0.254848 10.1482 0.254848V3.13069H8.65564C7.19952 3.13069 6.76268 4.00436 6.76268 4.95084V7.13502H10.0026L9.49291 10.4841Z"
        fill={fill}
      />
    </svg>
  );
};

export default FBIcon;
