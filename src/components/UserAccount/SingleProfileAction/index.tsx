import React, { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const SingleProfileAction = ({
  children,
  onClick,
  icon,
  className,
  ...props
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `bg-transparent font-semibold text-sm text-white/80 flex items-center gap-3 justify-start py-2
      rounded-lg w-full px-3 border-transparent cursor-pointer
      hover:bg-white/10 hover:border-white/10`,
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default SingleProfileAction;
