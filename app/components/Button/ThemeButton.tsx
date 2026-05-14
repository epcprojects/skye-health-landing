import React from "react";

type ThemeButtonVariant =
  | "primary"
  | "outlinedBluish"
  | "blackFilled"
  | "outlined"
  | "primaryblue"
  | "primaryFilled"
  | "whiteOutlined"
  ;

type ThemeButtonSize = "sm" | "md" | "lg"|"xl"|"xxl"| "extralarge" |"ultrasmall";

type IconPosition = "start" | "end";

type ThemeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ThemeButtonVariant;
  size?: ThemeButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
};

const variantClasses: Record<ThemeButtonVariant, string> = {
  primary: "bg-white text-black font-medium hover:bg-white rounded-full",
  outlinedBluish:
    "bg-white text-primary font-semibold border border-primary rounded-xl",
  blackFilled:
    "bg-black backdrop-blur-[66px] rounded-full font-semibold text-white ",
  outlined:
    "bg-white border border-black font-semibold text-black rounded-full",
  primaryblue:
    "bg-white text-primary font-semibold hover:bg-white rounded-full",
  primaryFilled:
  "bg-primary text-white font-semibold rounded-full"  ,
  whiteOutlined:
  "border border-white text-white bg-transparent rounded-full"
};

const sizeClasses: Record<ThemeButtonSize, string> = {
  sm: "md:px-7.5 px-4 py-4 text-base md:text-lg gap-4",
  md: "px-7.5 py-3 text-lg gap-2.5",
  lg: "px-10 py-4 text-lg gap-2.5",
  xl: "py-4 px-4 md:px-8 text-base md:text-[22px] gap-4",
  xxl: "py-4 px-11 text-lg gap-2.5",
  extralarge: "py-2 lg:py-[26px] px-4 lg:px-10 text-base lg:text-xl",
  ultrasmall: "py-3 px-6 text-lg gap-2.5"
};

const ThemeButton = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "start",
  className = "",
  disabled,
  type = "button",
  ...props
}: ThemeButtonProps) => {
  const iconElement = icon ? (
    <span className="inline-flex  shrink-0 items-center justify-center">
      {icon}
    </span>
  ) : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex cursor-pointer items-center justify-center
        transition-colors duration-200
        disabled:pointer-events-none disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {iconPosition === "start" && iconElement}
      {label}
      {iconPosition === "end" && iconElement}
    </button>
  );
};

export default ThemeButton;
