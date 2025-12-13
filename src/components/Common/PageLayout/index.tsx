import { ReactNode } from "react";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
}

export default function PageLayout({
  children,
  className = "",
  showFooter = true,
}: PageLayoutProps) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-5 pt-20 min-h-screen ${className}`}
      >
        {children}
      </div>
      {showFooter && <Footer />}
    </>
  );
}
