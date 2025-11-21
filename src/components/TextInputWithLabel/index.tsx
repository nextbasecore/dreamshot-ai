import { LinkActionT } from "@/types";
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  action?: LinkActionT;
  rightIcon?: ReactNode;
}

const TextInputWithLabel = ({ label, action, rightIcon, ...props }: Props) => {
  return (
    <div className="relative ">
      <input
        {...props}
        className="w-full h-12 outline-none bg-black/5 rounded-md px-4 pr-12 text-black placeholder-black/40 text-sm"
      />
      {rightIcon && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer pt-2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default TextInputWithLabel;
