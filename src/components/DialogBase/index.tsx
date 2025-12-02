"use client";

import { DialogProps } from "@/types";
import {
  Dialog as UIDialog,
  DialogPortal as UIDialogPortal,
  DialogOverlay as UIDialogOverlay,
  DialogContent as UIDialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";
import { DialogHeader } from "./DialogHeader";
import { dialogAtom } from "@/atoms/dialogAtom";
import { X } from "lucide-react";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

export const DialogBase = ({
  children,
  name,
  title,
  trigger,
  headingClassName,
  description,
  disableClose = false,
  className,
  hideHeader = false,
  fullScreen = false,
  titleClassName,
  isPaddingAroundRemoved = false,
  descriptionClassName,
  isCloseWhite = false,
  closeClassName,
  disableOutsideClick = false,
  onDialogClose,
  headerClassName = "",
  removeScrollbar = false,
  pClass,
  removeCloseButton = false,
  outsideCloseButton = false,
  outsideCloseButtonClassName,
  // Toggle props
  showToggle = false,
  toggleOptions,
  selectedToggleValue,
  onToggleChange,
  toggleClassName,
  myCreationButton = false,
  onMyCreationClick,
  hideModelChanger = false,
  recentAndPresetPop = false,
  recentAndPresetValue,
  onRecentAndPresetChange,
  onBackButtonClick,
  showHistory,
  showBackForSelectedImage = false,
  isModelGenerator = false,
}: DialogProps) => {
  const [type, setType] = useAtom(dialogAtom);
  const { handleDialogType } = useHandleDialogType();
  console.log(type);

  // Check if login dialog is open and current dialog is not login
  // const isLoginOpen = type?.includes("login");
  // const isCurrentDialogLogin = name === "login";
  const shouldShowDialog = type ? type.includes(name) : false;

  // Hide all other dialogs when login is open, except the login dialog itself
  // const shouldHideDialog = isLoginOpen && !isCurrentDialogLogin;

  return (
    <UIDialog
      open={shouldShowDialog}
      onOpenChange={(open) => {
        if (disableClose) return;
        if (disableOutsideClick && !open) return;
        if (!open && onDialogClose) {
          onDialogClose();
        }
        setType(open ? [name] : []);
      }}
    >
      {trigger}
      <UIDialogPortal>
        {/* Only show overlay for the first dialog in the stack to prevent multiple overlays */}
        <UIDialogOverlay className={twMerge("z-[99]", (type[0] !== name) ? "hidden pointer-events-none" : "")} />
        <UIDialogContent
          showCloseButton={removeCloseButton ? false : true}
          className={twMerge(
            `fixed  left-[50%] top-[50%] z-[997] flex max-h-full  translate-x-[-50%] translate-y-[-50%]
            focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 h-auto w-[90vw] sm:max-w-[420px] outline-none rounded-3xl `,
            fullScreen ? "h-full" : "h-auto",
            className,
            // Apply blur to all dialogs except the last one in the stack
            // Also hide pointer events if login is open and this is not the login dialog
            (name !== type[type.length - 1]) ? " pointer-events-none" : "",
            (name !== type[type.length - 1] && type.length > 1 && ["shareDialog", "login", "verifyEmail", "register", "guidance-dialog", "forgotPassword", "insufficientCredits", "resultFeedback"].includes(type[type.length - 1])) ? " hidden" : ""
          )}
        >
          <div
            className={twMerge(
              "w-full overflow-auto relative flex flex-1 flex-col min-h-0 bg-sBackground text-foreground rounded-3xl",
              removeScrollbar && "overflow-hidden",
              className
            )}
          >
            <div
              className={twMerge(
                pClass ? pClass : "p-0 ",
                isPaddingAroundRemoved && "p-0 sm:p-0",
                " flex flex-1 flex-col min-h-0"
              )}
            >
              {/* Always render DialogTitle for accessibility - visually hidden when header is shown, visible when header is hidden */}
              {title && (
                <DialogTitle className="sr-only">
                  {title}
                </DialogTitle>
              )}
              {!hideHeader && (
                <DialogHeader
                  title={title}
                  headingClassName={headingClassName}
                  hideHeader={hideHeader}
                  disableClose={disableClose}
                  setType={setType}
                  isCloseWhite={isCloseWhite}
                  closeClassName={closeClassName}
                  titleClassName={titleClassName}
                  headerClassName={headerClassName}
                  removeCloseButton={removeCloseButton}
                  showToggle={showToggle}
                  toggleOptions={toggleOptions}
                  selectedToggleValue={selectedToggleValue}
                  onToggleChange={onToggleChange}
                  toggleClassName={toggleClassName}
                  myCreationButton={myCreationButton}
                  onMyCreationClick={onMyCreationClick}
                  outsideCloseButtonClassName={outsideCloseButtonClassName}
                  handleDialogType={handleDialogType}
                  hideModelChanger={hideModelChanger}
                  recentAndPresetPop={recentAndPresetPop}
                  recentAndPresetValue={recentAndPresetValue}
                  onRecentAndPresetChange={onRecentAndPresetChange}
                  onBackButtonClick={onBackButtonClick}
                  showHistory={showHistory}
                  showBackForSelectedImage={showBackForSelectedImage}
                  description={description}
                  isModelGenerator={isModelGenerator}
                />
              )}
              {description && (
                <h3
                  className={twMerge(
                    "text-gray-600 sm:mt-2 mt-1 text-[15px] leading-normal mb-5",
                    hideHeader && !description && "mb-0",
                    descriptionClassName
                  )}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <div className=" flex flex-1 flex-col min-h-0">{children}</div>
            </div>
          </div>
          {!disableClose && !removeCloseButton && (
            <div className="ms-2 md:block hidden">
              <button
                aria-label="Close"
                onClick={() =>
                  (onDialogClose && onDialogClose()) ||
                  handleDialogType(type[type.length - 1], "remove")
                }
                className={twMerge(
                  " z-[998] flex h-9 w-9 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full bg-background text-foreground transition-all hover:bg-white hover:text-foreground/90 outline-none",
                  outsideCloseButtonClassName
                )}
              >
                <X size={18} />
              </button>
            </div>
          )}
        </UIDialogContent>
      </UIDialogPortal>
    </UIDialog>
  );
};
