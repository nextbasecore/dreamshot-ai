

export const IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const GIF_TYPE = "image/gif";

export const WEBP_TYPE = "image/webp";

export const API_LINK =
  "https://rapidapi.com/DeepSwapper/api/deepswapper-face-swap/";

  export const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska']


export const CONTACT_EMAIL = "contact@dreamshot.ai";

export const EMAIL_LINK_API_ACCESS = `mailto:${CONTACT_EMAIL}?subject=API%20Access%20Inquiry&body=Dear%20Recipient,%0D%0A%0D%0AI am writing to inquire about access to DeepSwapper APIs. Could you please provide information regarding the pricing, process, documentation, and any requirements for obtaining API access?%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards,%0D%0AYour Name`;

export const DISCORD_LINK = "https://discord.gg/mjBk9M29Ff";

export const YOUTUBE_LINK = "https://www.youtube.com/@DeepSwapper";

export const TWITTER_LINK = "https://x.com/deepswapper";

export const PINTEREST_LINK = "https://www.pinterest.com/deepswapper/";

export const S3_BUCKET_NAME = "deep-swapper";

export const CDN_ENDPOINT = `https://cdn.deepswapper.com/file/${S3_BUCKET_NAME}`;

export const FREE_API_ENDPOINT = "https://faceswap.remixai.io/swap";

export const CORE_API_ENDPOINT = "https://core.remixai.io";
// export const CORE_API_ENDPOINT = "http://localhost:8080";

export const TIME_OUT_REQUEST = 1000 * 60 * 10; // 5 minutes

export const MAX_IMAGE_RESOLUTION = 4000;

export const MAX_VIDEO_RESOLUTION = 2200;

export const MAX_GIF_FILE_SIZE_MB = 50;

export const MAX_VIDEO_DURATION_SECONDS = 7200;

export const MAX_VIDEO_DURATION_FREE_SECONDS = 60;

export const MAX_IMAGE_FILE_SIZE_MB = 50;
export const MAX_VIDEO_FILE_SIZE_MB = 2000;

export const DO_SPACE_ENDPOINT =
  "https://face-swap-images.sfo2.cdn.digitaloceanspaces.com/deepswapper";

export const RECAPTCHA_SITE_KEY = "6LckF14pAAAAAEvHWwNNHCAcBYbLNLUbBeJFxTO5";

export const API_ENDPOINT = "https://api.deepswapper.com";


// export const AFFILIATE_BENEFITS = [
//   {
//     icon: RecurringRevenueIcon,
//     title: 'Recurring Revenue',
//     content:
//       'Earn ongoing 50% commissions from your referred customers’ subscription renewal',
//   },
//   {
//     icon: CookieWindowIcon,
//     title: 'Generous 60 day cookie window',
//     content:
//       'Receive credit for sales made by your referrals within 60 days of their initial click.',
//   },
//   {
//     icon: PriceLabelIcon,

//     title: 'Get at much as $5000 a month!',
//     content: `Contribute to DeepSwapper's growth and earn substantial commissions in the process.`,
//   },
// ]

// export const BLOG_CONTENT = [
//   {
//     author: 'Jon Valiums',
//     date: 'April 5, 2024 ',
//     time: '5 min',
//     images:
//       'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     title:
//       'How to swap faces in a group Photo or Video in DeepSwapper Website?',
//   },
// ]

export const PADDLE_LIVE_TOKEN = "live_ca5d9caed26895fa92645262de7";

export const PADDLE_TEST_TOKEN = "test_65ffdbb515dde30b2c608ecf153";

export const PADDLE_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true"
    ? PADDLE_TEST_TOKEN
    : PADDLE_LIVE_TOKEN;

export const VERIFY_EMAIL_API =
  "https://customverifyemail-25bg7m7zfa-uc.a.run.app";

export const locales = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "ja",
  "nl",
  "tr",
  "pl",
  "ar",
  "vi",
  "sv",
  "th",
  "da",
  "no",
  "ko",
  "zh",
  "hi",
];

export const languageMap: {
  [key: string]: string;
} = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  nl: "Dutch",
  tr: "Turkish",
  pl: "Polish",
  ar: "Arabic",
  vi: "Vietnamese",
  sv: "Swedish",
  th: "Thai",
  da: "Danish",
  no: "Norwegian",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
};

export const INFINITY_CORP_TOOLS_LINK = "/tools";

const additional_credits = [
  {
    priceId: "pri_01j6s1a5tzgb9hsexb1wx6e7dy",
    credits: 100,
    price: "10$",
  },
  {
    priceId: "pri_01j6s1byxymvwds2ww7amfxrhz",
    credits: 500,
    price: "20$",
  },
  {
    priceId: "pri_01j6s1er5derbv2ckd6wma00z2",
    credits: 1500,
    price: "30$",
  },
];
