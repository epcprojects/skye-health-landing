import React from "react";

const PlusIcon = ({ fill = "white" }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.15625 0.84375V6.46875H13.7812H14.625V8.15625H13.7812H8.15625V13.7812V14.625H6.46875V13.7812V8.15625H0.84375H0V6.46875H0.84375H6.46875V0.84375V0H8.15625V0.84375Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
