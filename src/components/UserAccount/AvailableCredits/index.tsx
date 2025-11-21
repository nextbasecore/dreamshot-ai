import { FillThunderIcon, ThunderIcon } from "@/components/Icons";
import { twMerge } from "tailwind-merge";
import { AvailableCreditsProps } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAuthAtom";
import { useRouter } from "next/navigation";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

const AvailableCredits = ({
  credits,
  compact = false,
  className,
  isHeader = false,
  removeBG = false,
}: AvailableCreditsProps) => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const { handleDialogType } = useHandleDialogType();

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleAddCredits = () => {
    user?.subscription
      ?
        handleDialogType("addCredit", "add")
      : router.push("/price");
  };
  const getButtonText = () => {
    if (user?.subscription) {
      return "Add Credits";
    }
    return "Upgrade";
  };

  const totalCredits = (user && user?.subscription?.creditsGranted) || 5;
  const currentBalance = user ? user?.credits || 0 : 0;
  const creditUsagePercentage = Math.min(
    (currentBalance / totalCredits) * 100,
    100
  );

  const creditsDisplay = (
    <div className="flex flex-row items-center gap-1 justify-center">
      <span className="text-foreground">
        <FillThunderIcon className="w-4.5 h-4.5 text-foreground" />
      </span>
      <span className="text-foreground/80 text-sm text-nowrap font-medium">
        <b className="font-medium text-foreground">{Math.floor(credits)}</b>{" "}
        {compact ? "" : "Credits"}
      </span>
    </div>
  );

  if (isHeader) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-white p-1 rounded-full custom-shadow cursor-pointer">
            <div
              className={twMerge(
                "bg-gray-100 rounded-full md:px-6 px-4 md:py-3.5 py-2 flex items-center gap-1 text-md",
                compact ? "w-fit" : "w-full",
                className
              )}
            >
              {creditsDisplay}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          alignOffset={18}
          sideOffset={20}
          className="md:w-sm w-xs p-6 bg-sBackground rounded-4xl custom-shadow"
        >
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground text-lg font-medium">
                  Current Plan
                </span>
                <div className="bg-black/10 px-3 py-1 rounded-[40px]">
                  <span className="text-foreground text-sm font-medium">
                    {user?.subscription
                      ? capitalizeFirstLetter(user?.subscription?.name)
                      : "Free Plan"}
                  </span>
                </div>
              </div>

              <hr className="w-full border-foreground/10 mb-2" />
              {/* Monthly Limit Section */}
              <div className="w-full mb-2">
                <div className="flex items-center gap-1.5 mb-4">
                  <ThunderIcon className="w-4.5 h-4.5" />
                  <span className="text-sm font-semibold text-foreground">
                    Credits Usage
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Balance {currentBalance}
                  </span>
                  <span className="text-sm font-semibold text-foreground/50">
                    Limit {totalCredits}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-foreground/10 rounded-full">
                  <div
                    className="h-full bg-foreground rounded-full"
                    style={{ width: `${creditUsagePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            <Button
              variant="dark"
              onClick={handleAddCredits}
              className="w-full py-3"
            >
              {getButtonText()}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div
      className={twMerge(
        "flex flex-col select-none my-2 items-center justify-center gap-3 bg-black/10 pr-4 pl-3 rounded-md w-full py-2",
        compact ? "w-fit" : "w-full",
        className,
        removeBG && "bg-transparent"
      )}
    >
      {creditsDisplay}
    </div>
  );
};

export default AvailableCredits;
