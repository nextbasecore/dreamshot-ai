import { Metadata } from "next";
import { getAllToolConfigs } from "@/config/tools.server";
import EffectsPageLayout from "@/components/EffectsPages/EffectsPageLayout";
import EffectsPageHeader from "@/components/EffectsPages/EffectsPageHeader";
import EffectsPageContent from "@/components/EffectsPages/EffectsPageContent";

export const metadata: Metadata = {
  title: "Free AI Image Effects & Filters | Dreamshot Art",
  description:
    "Change your photos with Dreamshot&apos;s free AI image effects and filters. Explore a variety of styles, from artistic to cinematic, and transform your photos with smart image editing tools.",
  alternates: {
    canonical: "https://www.dreamshot.art/image-effects",
  },
};

export default async function ImageEffectsPage() {
  const tools = await getAllToolConfigs();

  return (
    <EffectsPageLayout>
      <EffectsPageHeader
        title="Image Effects"
        description="Transform your photos with Dreamshot's free AI image effects and filters. Explore a variety of styles, from artistic to cinematic."
      />
      <EffectsPageContent tools={tools} category="image-effects" />
    </EffectsPageLayout>
  );
}
