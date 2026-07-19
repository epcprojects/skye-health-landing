import React from "react";

const NewArrowIcon = ({width="16",height="16",fill="#3D74E9"}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.97974 3.64645C9.175 3.45118 9.49158 3.45118 9.68685 3.64645L13.6868 7.64645C13.8821 7.84171 13.8821 8.15829 13.6868 8.35355L9.68685 12.3536C9.49158 12.5488 9.175 12.5488 8.97974 12.3536C8.78448 12.1583 8.78448 11.8417 8.97974 11.6464L12.1262 8.5H2.66663C2.39048 8.5 2.16663 8.27614 2.16663 8C2.16663 7.72386 2.39048 7.5 2.66663 7.5L12.1262 7.5L8.97974 4.35355C8.78448 4.15829 8.78448 3.84171 8.97974 3.64645Z"
        fill={fill}
      />
    </svg>
  );
};

export default NewArrowIcon;
