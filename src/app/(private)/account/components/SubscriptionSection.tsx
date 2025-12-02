import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import AvailableCredits from "@/components/UserAccount/AvailableCredits";
import { CrossArrowIcon } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

interface SubscriptionSectionProps {
    /** Callback when manage subscription is clicked */
    onManageSubscription: () => void;
}

/**
 * Subscription section component
 * Displays subscription information and plan details
 */
export function SubscriptionSection({ onManageSubscription }: SubscriptionSectionProps) {
    const user = useAtomValue(userAuthAtom);
    const router = useRouter();

    if (user === "loading" || !user) {
        return null;
    }

    const getSubscriptionName = () => {
        if (!user?.subscription) return "Upgrade for faster generations & more credits";
        const planId = Number(user.subscription.planId);
        if (planId === 1 || planId === 4) return "Basic Active Plan";
        if (planId === 2 || planId === 5) return "Standard Active Plan";
        if (planId === 3 || planId === 6) return "Premium Active Plan";
        return "Free Plan";
    };

    const getDateTitle = (isCancelled: boolean) => {
        if (isCancelled) return "Plan ends on";
        return "Renews on";
    };

    const getIsCancelledAfterTag = () => {
        if (!user?.subscription) return "Upgrade for faster generations & more credits";
        return "Upgrade for faster generations & more credits";
    };

    return (
        <>

            {/* Plan Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl py-5 px-5 border border-blue-200/50 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300">
                <div
                    className={twMerge(
                        "flex items-center justify-between",
                        user?.subscription && !user?.subscription?.isCancelled
                            ? "border-b border-blue-200/50 pb-4"
                            : ""
                    )}
                >
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm font-semibold">
                            {user?.subscription ? getSubscriptionName() : "Free Plan"}
                        </h3>
                        <p className="md:text-sm text-xs  text-gray-500 mt-1 font-medium">
                            {user?.subscription
                                ? `${getDateTitle(user?.subscription?.isCancelled || false)} ${new Date(
                                    Number(user.subscription.renewsAt) * 1000
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}`
                                : "You have no active subscription"}
                        </p>
                    </div>
                    <div className="md:block hidden ml-4">
                        <AvailableCredits credits={user?.credits ?? 0} compact removeBG />
                    </div>
                    <div className="md:hidden block ml-4">
                        <AvailableCredits
                            credits={user?.credits ?? 0}
                            compact
                            className="py-2"
                        />
                    </div>
                </div>
                
                {user?.subscription && !user?.subscription?.isCancelled && (
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex-1">
                            <h3 className="text-gray-800 text-sm font-semibold">
                                Thanks for subscribing to Dreamshot{" "}
                                {Number(user?.subscription?.planId) === 1 ||
                                    Number(user?.subscription?.planId) === 4
                                    ? "Basic"
                                    : Number(user?.subscription?.planId) === 2 ||
                                        Number(user?.subscription?.planId) === 5
                                        ? "Standard"
                                        : "Premium"}!
                            </h3>
                            <p className="md:text-sm text-xs  text-gray-500 mt-1 font-medium">
                                Explore your new Pro features.{" "}
                                <button
                                    onClick={() => {
                                        router.push("/price");
                                    }}
                                    className="text-blue-700 underline hover:text-blue-900 text-xs sm:text-sm font-semibold bg-transparent border-0 px-0 py-0 cursor-pointer"
                                >
                                    Learn more
                                </button>
                            </p>
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={onManageSubscription}
                                className="flex items-center cursor-pointer transition-all duration-100"
                            >
                                <span className="text-blue-600 text-nowrap sm:text-sm text-xs cursor-pointer border border-blue-600 hover:border-blue-700 hover:text-blue-700 transition-colors duration-200 font-semibold bg-blue-200/30 hover:bg-blue-200/50 px-3 py-1.5 rounded-md">
                                    Manage
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

