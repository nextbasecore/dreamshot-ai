import { Metadata } from "next";
import { getAllToolConfigs } from "@/config/tools.server";
import FilteredTools from "@/components/FilteredTools";
import Footer from "@/components/Footer";
import FAQs from "@/components/FAQs";

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
    <>
      <div
        className="relative flex flex-col items-center gap-10 justify-center py-20 min-h-screen"
        style={{
          backgroundImage: "url(/assets/cloud-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Title and Description */}
        <div className="flex flex-col text-center items-center gap-10 justify-center mt-15 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
            Video Effects
          </h1>
          <p className="text-gray-500 max-w-xl">
            Dreamshot&apos;s AI Video Effects let you turn any photo into a
            lively, eye-catching video. With a variety of creative effects and
            animations, you can make engaging videos in seconds.
          </p>
        </div>

        {/* Filtered Tools Grid */}
        <div className="w-full flex justify-center">
          <FilteredTools tools={tools} category="video-effects" />
        </div>
      </div>

      {/* FAQs Section */}
      <div className="relative mb-16">
        <FAQs />
      </div>

      <Footer />
    </>
  );
}
