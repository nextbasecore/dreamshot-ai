import { Metadata } from "next";
import { getAllToolConfigs } from "@/config/tools.server";
import EffectsPageLayout from "@/components/EffectsPages/EffectsPageLayout";
import EffectsPageHeader from "@/components/EffectsPages/EffectsPageHeader";
import EffectsPageContent from "@/components/EffectsPages/EffectsPageContent";

export const metadata: Metadata = {
  title: "Free AI Video Effects & Filters | Dreamshot Art",
  description:
    "Dreamshot&apos;s AI Video Effects let you turn any photo into a lively, eye-catching video. With a variety of creative effects and animations, you can make engaging videos in seconds.",
  alternates: {
    canonical: "https://www.dreamshot.art/video-effects",
  },
};

export default async function VideoEffectsPage() {
  const tools = await getAllToolConfigs();

  return (
    <EffectsPageLayout>
      <EffectsPageHeader
        title="Video Effects"
        description="Dreamshot's AI Video Effects let you turn any photo into a lively, eye-catching video. With a variety of creative effects and animations, you can make engaging videos in seconds."
      />
      <EffectsPageContent tools={tools} category="video-effects" />
    </EffectsPageLayout>
  );
}
