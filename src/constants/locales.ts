export const SUPPORTED_LANGUAGES = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
    { code: "id", name: "Indonesian" },
    { code: "nl", name: "Dutch" },
    { code: "vi", name: "Vietnamese" },
    { code: "tr", name: "Turkish" },
    { code: "ko", name: "Korean" },
    { code: "fa", name: "Persian (Farsi)" },
    { code: "zh-cn", name: "Chinese (Simplified)" },
] as const;

// Export language codes as a simple string array for ergonomic usage with .includes, etc.
export const SUPPORTED_LANGUAGE_CODES: string[] = SUPPORTED_LANGUAGES.map(
    (lang) => lang.code
);


