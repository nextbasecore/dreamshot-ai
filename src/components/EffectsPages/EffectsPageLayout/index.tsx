import { ReactNode } from "react";
import Footer from "@/components/Footer";
import FAQs from "@/components/FAQs";

interface EffectsPageLayoutProps {
  children: ReactNode;
  showFAQs?: boolean;
}

export default function EffectsPageLayout({
  children,
  showFAQs = true,
}: EffectsPageLayoutProps) {
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
        {children}
      </div>

      {showFAQs && (
        <div className="relative mb-16">
          <FAQs />
        </div>
      )}

      <Footer />
    </>
  );
}
