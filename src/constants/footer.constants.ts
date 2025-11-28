export interface FooterLink {
  text: string;
  url: string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const FOOTER_DATA = {
  columns: [
    {
      heading: "Tools",
      links: [
        { text: "Pro Clothes Swap", url: "/advance-clothes-swap" },
        { text: "Quick Clothes Swap", url: "/clothes-swap" },
        { text: "Face Swap", url: "/face-swapper" },
      ]
    },
    {
      heading: "Workflows",
      links: [
        { text: "Video Generator", url: "/?type=video-generator" },
        { text: "Model Gen", url: "/?type=model-generator" },
        { text: "Clothes Gen", url: "/?type=cloth-generator" },
        { text: "Fashion Modeling", url: "/?type=fashion-modeling" },
        { text: "Product Modeling", url: "/?type=product-modeling" },
        { text: "Transformer Studio", url: "/?type=edit-image" },
        { text: "Camera Angle Change", url: "/?type=camera-angle-changer" },
        { text: "Background Replacer", url: "/?type=background-replacer" },
        { text: "Image Upscaler", url: "/?type=image-upscaler-v2" },
        { text: "Model Swap", url: "/?type=model-swap" },
        { text: "Sketch to Image", url: "/?type=sketch-generator" },
        { text: "Clothes Color Change", url: "/?type=cloth-color-change" },
        { text: "Clothes Extractor", url: "/?type=cloth-extractor" },
        { text: "Pose Generator", url: "/?type=pose-generator" },
      ]
    },
    {
      heading: "Company",
      links: [
        { text: "Contact", url: "mailto:contact@dressr.ai" },
        { text: "Pricing", url: "/price" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { text: "Terms", url: "/terms-of-service.html", external: true },
        { text: "Privacy", url: "/privacy-policy.html", external: true },
        { text: "Cancellation", url: "/cancellation-policy.html", external: true },
      ]
    }
  ] as FooterColumn[]
};
