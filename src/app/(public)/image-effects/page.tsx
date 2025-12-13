import { Metadata } from "next";
import { getAllToolConfigs } from "@/config/tools.server";
import FilteredTools from "@/components/FilteredTools";
import Footer from "@/components/Footer";
import FAQs from "@/components/FAQs";

export const metadata: Metadata = {
  title: "Free AI Image Effects & Filters | Dreamshot Art",
  description:
    "Change your photos with Dreamshot's free AI image effects and filters. Explore a variety of styles, from artistic to cinematic, and transform your photos with smart image editing tools.",
  alternates: {
    canonical: "https://www.dreamshot.art/image-effects",
  },
};

export default async function ImageEffectsPage() {
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
            Image Effects
          </h1>
          <p className="text-gray-500 max-w-xl">
            Transform your photos with Dreamshot's free AI image effects and
            filters. Explore a variety of styles, from artistic to cinematic.
          </p>
        </div>

        {/* Filtered Tools Grid */}
        <div className="w-full flex justify-center">
          <FilteredTools tools={tools} category="image-effects" />
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
