import { dialogAtom, DialogType } from "@/atoms/dialogAtom";

import * as Dialog from "@radix-ui/react-dialog";

import { Clock, X, XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import SwapType from "@/components/TypeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { backToResultAtom } from "@/atoms/backToResultAtom";
import { Back2Icon, ClockIcon } from "@/components/Icons";
import { InputSelector } from "@/components/InputFields/InputSelector";

export const DialogHeader = ({
  title,
  headingClassName,
  disableClose,
  setType: setDialog,
  titleClassName,
  headerClassName,
  removeCloseButton,
  showToggle,
  toggleOptions,
  selectedToggleValue,
  onToggleChange,
  toggleClassName,
  myCreationButton,
  onMyCreationClick,
  outsideCloseButtonClassName,
  handleDialogType,
  hideModelChanger,
  recentAndPresetPop,
  recentAndPresetValue,
  onRecentAndPresetChange,
  onBackButtonClick,
  showHistory,
  showBackForSelectedImage = false,
  description,
  isModelGenerator,
}: {
  title?: string;
  headingClassName?: string;
  hideHeader?: boolean;
  disableClose?: boolean;
  setType: (type: DialogType[]) => void;
  isCloseWhite?: boolean;
  closeClassName?: string;
  titleClassName?: string;
  headerClassName?: string;
  removeCloseButton?: boolean;
  showToggle?: boolean;
  toggleOptions?: Array<{ label: string; value: string }>;
  selectedToggleValue?: string;
  onToggleChange?: (value: string) => void;
  toggleClassName?: string;
  myCreationButton?: boolean;
  onMyCreationClick?: () => void;
  outsideCloseButtonClassName?: string;
  handleDialogType?: (type: DialogType, action: "add" | "remove") => void;
  hideModelChanger?: boolean;
  recentAndPresetPop?: boolean;
  recentAndPresetValue?: string;
  onRecentAndPresetChange?: (value: string) => void;
  onBackButtonClick?: () => void;
  showHistory?: boolean;
  showBackForSelectedImage?: boolean;
  description?: string;
  isModelGenerator?: boolean;
}) => {
  const router = useRouter();
  const [backToResult, setBackToResult] = useAtom(backToResultAtom);
  const [type] = useAtom(dialogAtom);

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    } else {
      setBackToResult(null);
    }
  };

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-between w-full md:mb-6 mb-3",
        description && "md:mb-0 mb-0"
      )}
    >
      <div
        className={twMerge(
          "flex flex-row items-center justify-between w-full md:mb-0 mb-3",
          headerClassName,
          titleClassName,
          description && "md:mb-0 mb-0"
        )}
      >
        {/* Left side - Title */}
        <div className="flex-1 md:flex-0">
          <h2
            className={twMerge(
              "text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl text-nowrap",
              headingClassName
            )}
          >
            {showHistory ||
            (showBackForSelectedImage && typeof backToResult === "number") ? (
              <button
                onClick={handleBackButtonClick}
                className="flex items-center cursor-pointer text-foreground/80 text-lg"
              >
                <Back2Icon className="w-5 h-5 mr-1" />
                Back
              </button>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* Center - Toggle (if enabled) */}
        {showToggle && !hideModelChanger && !showHistory && (
          <div
            className={twMerge(
              "flex-1 justify-center md:flex hidden",
              toggleClassName
            )}
          >
            <SwapType
              swapType={selectedToggleValue || ""}
              onSelect={(type) => onToggleChange?.(type)}
              options={toggleOptions}
              compact={true} 
              isModelGenerator={isModelGenerator}
            />
          </div>
        )}

        {/* Right side - Button and Selector */}
        <div className=" flex w-auto justify-end items-center gap-3">
          {recentAndPresetPop && (
            <InputSelector
              value={recentAndPresetValue || "recent"}
              onChange={(value) => onRecentAndPresetChange?.(value as string)}
              options={[
                { value: "recent", label: "Recent" },
                { value: "preset", label: "Preset" },
              ]}
              placeholder="Select type"
              // className="md:w-32 w-24"
              recentAndPresetPop={recentAndPresetPop}
            />
          )}
          {myCreationButton && (
            <Button
              onClick={() => {
                onMyCreationClick?.();
                if (onMyCreationClick) {
                  return;
                }
                router.push("/my-creations");
              }}
              variant="secondary"
              className={twMerge("flex items-center   gap-2 py-3 sm:px-5 px-3")}
            >
              <ClockIcon className="md:w-5.5 md:h-5.5 w-4 h-4" />
              <span className="hidden md:block text-md font-normal">
                My Creations
              </span>
            </Button>
          )}
        </div>
        {!disableClose && !removeCloseButton && (
          <div className="ms-2 block md:hidden">
            <button
              aria-label="Close"
              onClick={() =>
                handleDialogType?.(type[type.length - 1], "remove")
              }
              className={twMerge(
                " z-[998] flex h-10 w-10 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full bg-background text-foreground transition-all hover:bg-background/80 hover:text-foreground/90 outline-none",
                outsideCloseButtonClassName
              )}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
      {showToggle && !hideModelChanger && !showHistory && (
        <div
          className={twMerge(
            "flex-1 justify-center flex md:hidden w-full",
            toggleClassName
          )}
        >
          <SwapType
            swapType={selectedToggleValue || ""}
            onSelect={(type) => onToggleChange?.(type)}
            options={toggleOptions}
          />
        </div>
      )}
    </div>
  );
};

