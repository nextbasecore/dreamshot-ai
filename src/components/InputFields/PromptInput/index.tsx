import { cn } from "@/lib/utils";
import { LinkActionT } from "@/types";
import { DetailedHTMLProps, TextareaHTMLAttributes, ReactNode } from "react";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  action?: LinkActionT;
  rightIcon?: ReactNode;
  ModelGeneratorMode?: "basic" | "advance";
  isOptional?: boolean;
}

const PromptInput = ({ label, action, rightIcon, ModelGeneratorMode, isOptional, ...props }: Props) => {
  return (
    <div className="relative flex flex-col h-full">
      {label && (
        <h3 className="text-md font-medium text-foreground mb-2 tracking-normal">
          {label} {isOptional && <span className="text-foreground/50">(Optional)</span>}
        </h3>
      )}
      <div className={cn("flex-1 md:h-full h-40", ModelGeneratorMode === "advance" ? "md:h-full h-60" : "")}>
        <textarea
          {...props}
          className={cn("w-full outline-none bg-black/5 rounded-md px-4 hide-scrollbar select-none py-4 pr-12 text-black placeholder-black/40 text-sm resize-none", ModelGeneratorMode === "advance" ? "md:h-full h-40" : "h-full")}
        />
      </div>
    </div>
  );
};

export default PromptInput;
