import { Timestamp } from "firebase/firestore";
import { DialogType } from "@/atoms/dialogAtom";
import { ToolConfigJson } from "@/config/tools.server";


export interface DashboardPopularTool {
    title: string;
    imageUrl: string;
}

export interface DashboardOurFeature {
    title: string;
    description: string;
    imageUrl: string;
}

export interface DashboardTestimonial {
    title: string;
    subTitle: string;
    description: string;
    imageUrl: string;
}

export interface DashboardInspiration {
    imageUrl: string;
    title: string;
    prompt?: string;
    photoPack?: string;
    Model?: string;
}

export type PlanDuration = "monthly" | "annually";

export type PlanNameT = "Starter" | "Professional" | "Enterprise";

export type Plan = {
    name: PlanNameT;
    description: string;
    price: number;
    duration: PlanDuration;
    credits: number;
    features: string[];

    //   price: number;
    //   duration: PlanDuration;
    //   credits: number;
    //   priceId: string;
    //   name: PlanNameT;
    //   discountPrice: number;
    //   id: string;
    //   maxDurationSeconds: number;
    //   priceIds: string[];
    //   isFeatured: boolean;
    //   priceSuffix: string;
};



export interface DialogProps {
    children: React.ReactNode;
    name: DialogType;
    title?: string;
    trigger?: React.ReactNode;
    headingClassName?: string;
    description?: string;
    disableClose?: boolean;
    className?: string;
    descriptionClassName?: string;
    hideHeader?: boolean;
    titleClassName?: string;
    fullScreen?: boolean;
    isPaddingAroundRemoved?: boolean;
    isCloseWhite?: boolean;
    closeClassName?: string;
    disableOutsideClick?: boolean;
    onDialogClose?: () => void;
    headerClassName?: string;
    removeScrollbar?: boolean;
    pClass?: string;
    removeCloseButton?: boolean;
    outsideCloseButton?: boolean;
    outsideCloseButtonClassName?: string;
    // Toggle related props
    showToggle?: boolean;
    toggleOptions?: Array<{ label: string; value: string }>;
    selectedToggleValue?: string;
    onToggleChange?: (value: string) => void;
    toggleClassName?: string;
    myCreationButton?: boolean;
    onMyCreationClick?: () => void;
    hideModelChanger?: boolean;
    recentAndPresetPop?: boolean;
    recentAndPresetValue?: string;
    onRecentAndPresetChange?: (value: string) => void;
    onBackButtonClick?: () => void;
    showHistory?: boolean;
    showBackForSelectedImage?: boolean;
    isModelGenerator?: boolean;
}


export type SecureUser = {
    created_at?: Date;
    updated_at?: Date;
    credits?: number;
    subscription?: Subscription;
    addon?: {
        credits: number;
    };
};

export type Subscription = {
    createdAt: Date;
    creditsGranted: number;
    id: string;
    isCancelled: boolean;
    planId: string;
    expiredAt?: Timestamp;
    subscriptionId: string;
    name: string;
    renewsAt: string;
    transactionId: string;
    isExpired?: boolean;
    priceId: string;
};


export type LinkActionT = {
    onClick: () => void | Promise<unknown>;
    label: string;
    preFix?: string;
};

export interface AvailableCreditsProps {
    credits: number;
    compact?: boolean;
    className?: string;
    isHeader?: boolean;
    removeBG?: boolean;
}

// Re-export ToolConfigJson for convenience
export type { ToolConfigJson };

// Component prop interfaces for tool-related components
export interface ToolContextValue {
    toolConfig: ToolConfigJson | null;
}
