// Unified static content data for all pages (home, pricing, contact-us, etc.)

import {
    DashboardPopularTool,
    DashboardOurFeature,
    DashboardTestimonial,
    DashboardInspiration,
    StaticExample,
    StaticFaq,
    StaticHowItWorkStep
} from "@/types";

export interface FooterLink {
    text: string;
    url: string;
    external?: boolean;
}
export interface FooterColumn {
    heading: string;
    links: FooterLink[];
}

export const IN_ARTICLE_META_DATA = {
    title: "Your All-in-One AI Visual Creation Platform",
    description:
        "Dreamshot is an all-in-one AI photo and video creation platform that turns ordinary visuals into stunning effects in seconds. Now anyone can create eye-catching images and videos without editing skills, using smart and powerful AI tools.",
    alternates: {
        canonical: "https://www.dreamshot.art/",
    },
};

export const STATIC_FAQS = {
    heading: "Frequently Asked Questions",
    questions: [
        {
            question: "What is Dreamshot AI?",
            answer: "Dreamshot AI is a platform that lets you create, transform, and enhance visual content using advanced AI tools. You can generate images, videos, apply effects, remove backgrounds, upscale media, and convert text into visuals effortlessly."
        },
        {
            question: "What types of styles can I apply to my videos or images?",
            answer: "With Dreamshot AI, you can transform your videos and images into various creative styles, including anime, cartoon, Pixar, watercolor, pop art, 3D, comic, clay, and many more."
        },
        {
            question: "Do I need technical skills to use Dreamshot AI?",
            answer: "No technical expertise is required. The platform is user-friendly, and the AI handles all complex processes, allowing anyone to create professional-looking content easily."
        },
        {
            question: "Is Dreamshot AI free to use?",
            answer: "Yes! Dreamshot AI offers free credits so you can explore and try out features. To access advanced tools and higher usage limits, you can upgrade your subscription."
        },
        {
            question: "Can I use Dreamshot AI content for commercial purposes?",
            answer: "Yes, content created with Dreamshot AI can be used for personal or commercial projects. Please ensure you respect individual rights and avoid unethical or illegal use."
        },
        {
            question: "How secure is my content and data?",
            answer: "Dreamshot AI takes data security and privacy seriously. Your content is processed securely and is never sold, shared, or used for advertising purposes."
        },
        {
            question: "Can I edit or refine generated content?",
            answer: "Absolutely. Dreamshot AI allows you to enhance, tweak, and re-generate results directly on the platform, so you can perfect your creations."
        },
        {
            question: "What file formats does Dreamshot AI support?",
            answer: "Dreamshot AI supports all major image, video, and audio formats, including PNG, JPG, WEBP, MOV, and WAV, ensuring compatibility across platforms."
        },
        {
            question: "How can I contact Dreamshot AI support?",
            answer: "You can reach our support team via the contact form on the website or email us directly at support@dreamshot.ai. We typically respond within 24 hours."
        }
    ] as StaticFaq[]
};

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

export const STATIC_FEATURES: string[] = [
    "Access to all styles & tools",
    "Private generation",
    "Storage for 60 days",
    "No watermark",
    "No ads",
    "Download & Delete options"
];

// Home/Dashboard page constants
export const DASHBOARD_POPULAR_TOOLS: DashboardPopularTool[] = [
    {
        title: "AI Pregnant Filter",
        imageUrl: "/assets/PopularTools/ImageUpscale.png",
    },
    {
        title: "Image Enhancer",
        imageUrl: "/assets/PopularTools/ImageEnhancer.png",
    },
    {
        title: "Background Remover",
        imageUrl: "/assets/PopularTools/BackgroundRemover.png",
    },
    {
        title: "Retouch",
        imageUrl: "/assets/PopularTools/Retouch.png",
    },
    {
        title: "Ghibli Filter",
        imageUrl: "/assets/PopularTools/GhibliFilter.png",
    },
    {
        title: "Winter Filter",
        imageUrl: "/assets/PopularTools/WinterFilter.png",
    },
    {
        title: "Christmas Filter",
        imageUrl: "/assets/PopularTools/ChristmasFilter.png",
    },
    {
        title: "Anime Filter",
        imageUrl: "/assets/PopularTools/AnimeFilter.png",
    },
];

export const STATIC_SIMILAR_TOOLS = {
    heading: "Similar Tools",
    title: "Recommended for You",
    tools: DASHBOARD_POPULAR_TOOLS
};

export const DASHBOARD_OUR_FEATURES: DashboardOurFeature[] = [
    {
        title: "Text to Video AI",
        description:
            "Dreamshot AI lets you turn your written ideas into engaging videos. Just type your prompts, and the AI generates visuals that bring your concepts to life with smooth motion and clear storytelling.",
        imageUrl: "https://assets.chromastudio.ai/Public/Dreamshot/features/Video-to-Video-AI.webp",
    },
    {
        title: "Image to Video AI",
        description:
            "Easily transform any image into a video. Dreamshot AI maintains visual style and consistency while creating dynamic scenes that make your photos feel alive.",
        imageUrl: "https://assets.chromastudio.ai/Public/Dreamshot/features/Image-to-Video.webp",
    },
    {
        title: "AI Avatar Generator",
        description:
            "Turn a single photo into a fully animated AI avatar. The avatar moves naturally, shows expressive emotions, and can be used in videos or creative projects.",
        imageUrl: "https://assets.chromastudio.ai/Public/Dreamshot/features/AI-Avatar-Generator.webp",
    },
    {
        title: "Video to Video AI",
        description:
            "Convert your existing videos into different animation styles, from anime and cartoons to artistic painting styles, giving your content a fresh and unique look.",
        imageUrl: "https://assets.chromastudio.ai/Public/Dreamshot/features/Video-to-Video-AI.webp",
    },
    {
        title: "Text & Image AI Generators",
        description:
            "Create high-quality images from text descriptions or transform existing images into new styles. Dreamshot AI makes it simple to produce visuals for social media, creative projects, or professional use.",
        imageUrl: "https://assets.chromastudio.ai/Public/Dreamshot/features/Text-&-Image-AI-Generators.webp",
    },
];

export const DASHBOARD_TESTIMONIALS: DashboardTestimonial[] = [
    {
        title: "James K.",
        subTitle: "Regular User",
        description:
            "Love the variety of AI effects for images and videos. Even the video-to-video tool works flawlessly. Highly recommended for creators!",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
    {
        title: "Priya S.",
        subTitle: "Student",
        description:
            "Everything I need for creative projects is in one place. Text-to-video and image-to-image features are my favorites. Super intuitive!",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
    {
        title: "Nina L.",
        subTitle: "Image Editor",
        description:
            "Such a creative hub! Text-to-image and video effects are amazing. Makes content creation really fun.",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
    {
        title: "Daniel R.",
        subTitle: "Content Creator",
        description:
            "Fast, easy, and very versatile. The image and video editing tools make content creation a breeze. Definitely worth trying!",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
    {
        title: "Emily T.",
        subTitle: "Influencer",
        description:
            "This website makes AI content creation fun and simple. The effects and conversion tools produce high-quality results every time.",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
    {
        title: "Sophia H.",
        subTitle: "Video Editor",
        description:
            "Amazing platform for creators! The range of tools lets me experiment with both images and videos easily.",
        imageUrl: "/assets/Testimonials/Testimonial.png",
    },
];



export const DASHBOARD_INSPIRATION_LINE_1: DashboardInspiration[] = [
    {
        imageUrl: "/assets/Inspiration/1.png",
        title: "Inspiration 1",
        prompt: "Inspiration 1 Prompt Text Here Please enter the prompt here and also add the photo pack and the model name if you want to use it",
        photoPack: "Inspiration 1 Model",
        Model: "Inspiration 1 Model",
    },
    {
        imageUrl: "/assets/Inspiration/2.png",
        title: "Inspiration 2",
    },
    {
        imageUrl: "/assets/Inspiration/3.png",
        title: "Inspiration 3",
    },
    {
        imageUrl: "/assets/Inspiration/4.png",
        title: "Inspiration 4",
    },
    {
        imageUrl: "/assets/Inspiration/5.png",
        title: "Inspiration 5",
    },
    {
        imageUrl: "/assets/Inspiration/6.png",
        title: "Inspiration 6",
    },
    {
        imageUrl: "/assets/Inspiration/7.png",
        title: "Inspiration 7",
    },
    {
        imageUrl: "/assets/Inspiration/8.png",
        title: "Inspiration 8",
    },
    {
        imageUrl: "/assets/Inspiration/9.png",
        title: "Inspiration 9",
    }
];

export const DASHBOARD_INSPIRATION_LINE_2: DashboardInspiration[] = [
    {
        imageUrl: "/assets/Inspiration/5.png",
        title: "Inspiration 5",
    },
    {
        imageUrl: "/assets/Inspiration/6.png",
        title: "Inspiration 6",
    },
    {
        imageUrl: "/assets/Inspiration/7.png",
        title: "Inspiration 7",
    },
    {
        imageUrl: "/assets/Inspiration/8.png",
        title: "Inspiration 8",
    },
    {
        imageUrl: "/assets/Inspiration/9.png",
        title: "Inspiration 9",
    },
    {
        imageUrl: "/assets/Inspiration/1.png",
        title: "Inspiration 1",
    },
    {
        imageUrl: "/assets/Inspiration/2.png",
        title: "Inspiration 2",
    },
    {
        imageUrl: "/assets/Inspiration/3.png",
        title: "Inspiration 3",
    },
    {
        imageUrl: "/assets/Inspiration/4.png",
        title: "Inspiration 4",
    }
];

// Curved carousel images - 7 images displayed in a fanned-out curved layout
export const CURVED_CAROUSEL_IMAGES: DashboardInspiration[] = [
    {
        imageUrl: "/assets/CurvedCarouselTest/1.png",
        title: "Inspiration 1",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/2.png",
        title: "Inspiration 2",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/3.png",
        title: "Inspiration 3",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/4.png",
        title: "Inspiration 4",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/5.png",
        title: "Inspiration 5",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/6.png",
        title: "Inspiration 6",
    },
    {
        imageUrl: "/assets/CurvedCarouselTest/7.png",
        title: "Inspiration 7",
    },
];

// Common link styling used across all footer links
export const FOOTER_LINK_STYLES = "text-gray-400 text-sm md:text-base hover:text-gray-300 transition-colors block";

// Footer section data - Image Effects links
export const FOOTER_IMAGE_EFFECTS_LINKS: FooterLink[] = [
    { text: "Ai Pregnant Filter", url: "/image-effects/ai-pregnant-filter" },
    { text: "South Park Character", url: "/image-effects/south-park-character" },
    { text: "Ai Mugshot Filter", url: "/image-effects/mugshot" },
    { text: "Ai Skinny Filter", url: "/image-effects/ai-skinny-filter" },
    { text: "Ai Fat Filter", url: "/image-effects/ai-fat-filter" },
    { text: "AI Disney Pixar Effect", url: "/image-effects/disney-pixar-filter" },
    { text: "AI Selfie with Celebrity", url: "/image-effects/selfie-with-celebrities" },
    { text: "Baby Face Generator", url: "/image-effects/baby-face-generator" },
    { text: "Action Figure Generator", url: "/image-effects/action-figure-generator" },
    { text: "Photo to Sketch Generator", url: "/image-effects/photo-to-sketch" },
    { text: "AI Silhouette Effect", url: "/image-effects/silhouette-filter" },
];

// Footer section data - Video Effects links
export const FOOTER_VIDEO_EFFECTS_LINKS: FooterLink[] = [
    { text: "Fight With Santa Video Generator", url: "/video-effects/fighting-with-santa" },
    { text: "Santa Kidnapping", url: "/video-effects/santa-kidnapping" },
    { text: "Reindeer Ride With Santa", url: "/video-effects/reindeer-ride-with-santa" },
    { text: "Santa Transformation", url: "/video-effects/santa-transformation" },
    { text: "Santa Hug", url: "/video-effects/santa-hug" },
    { text: "Selfie With Santa", url: "/video-effects/selfie-with-santa" },
    { text: "Santa Giving Gift Video Generator", url: "/video-effects/santa-giving-gift" },
];

// Footer section data - Business links (null url means no link, just text)
export const FOOTER_BUSINESS_LINKS: FooterLink[] = [
    { text: "About Us", url: "" },
    { text: "Pricing", url: "/pricing" },
    { text: "Affiliate", url: "" },
    { text: "Contact Us", url: "/contact-us" },
];

// Footer section data - Legal links
export const FOOTER_LEGAL_LINKS: FooterLink[] = [
    { text: "Privacy Policy", url: "/privacy.html" },
    { text: "Terms & Conditions", url: "/terms.html" },
    { text: "Cancellation & Refund", url: "/cancellation-and-refund.html" },
];

// Legacy FOOTER_DATA structure (kept for backward compatibility)
export const FOOTER_DATA = {
    columns: [
        {
            heading: "Image Effects",
            links: FOOTER_IMAGE_EFFECTS_LINKS
        },
        {
            heading: "Video Effects",
            links: FOOTER_VIDEO_EFFECTS_LINKS
        },
        {
            heading: "Business",
            links: FOOTER_BUSINESS_LINKS
        },
        {
            heading: "Legal",
            links: FOOTER_LEGAL_LINKS
        }
    ] as FooterColumn[]
};

