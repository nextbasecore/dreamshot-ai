// Unified static content data for non-dynamic pages (dashboard, pricing, contact-us, etc.)

import { DashboardPopularTool } from "@/types";
import { DASHBOARD_POPULAR_TOOLS } from "./dashboard.constants";

// FAQs
export interface StaticFaq {
    question: string;
    answer: string;
}

export const STATIC_FAQS = {
    heading: "Ask Anything, Get Answers",
    questions: [
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit fmnadsl fndasjfndljskafnljkad afdslfkdasnfijndskfn dasfdas fda sfdsaf ds fasf dasf asd fd dsnf pdasn fjnd sapfuand das fndsn fpasdnfpodasn  nfijdsknfijds fdsf dsafdsaf dsno cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        },
        {
            question: "Est Vitae FAo congue ullam elit no cum?",
            answer: "Est Vitae FAo congue ullam elit no cum?"
        }
    ] as StaticFaq[]
};

// How It Works
export interface StaticHowItWorkStep {
    step: number;
    title: string;
    bulletPoints: string[];
}

export const STATIC_HOW_IT_WORKS = {
    heading: "How It Work",
    title: "How Our AI Transforms Your Photos",
    description: "",
    steps: [
        {
            step: 1,
            title: "Upload Your Photo",
            bulletPoints: [
                "Upload an image or drag and drop it directly from your device."
            ]
        },
        {
            step: 2,
            title: "Apply AI Effect",
            bulletPoints: [
                "Choose your desired effect and let AI process your image."
            ]
        },
        {
            step: 3,
            title: "Download & Share",
            bulletPoints: [
                "Download your transformed image and share it with others."
            ]
        }
    ] as StaticHowItWorkStep[]
};

// Examples
export interface StaticExample {
    beforeImageUrl: string;
    afterImageUrl: string;
}

export const STATIC_EXAMPLES = {
    heading: "Examples",
    title: "Before & After Previews",
    description: "",
    examples: [
        {
            beforeImageUrl: "/assets/PopularTools/BackgroundRemover.png",
            afterImageUrl: "/assets/PopularTools/AnimeFilter.png"
        },
        {
            beforeImageUrl: "/assets/PopularTools/GhibliFilter.png",
            afterImageUrl: "/assets/PopularTools/ChristmasFilter.png"
        },
        {
            beforeImageUrl: "/assets/PopularTools/ImageEnhancer.png",
            afterImageUrl: "/assets/ContactUs/Background.png"
        }
    ] as StaticExample[]
};

// Similar Tools
export const STATIC_SIMILAR_TOOLS = {
    heading: "Similar Tools",
    title: "Recommended for You",
    tools: DASHBOARD_POPULAR_TOOLS as DashboardPopularTool[]
};

