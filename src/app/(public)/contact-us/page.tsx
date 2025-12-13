import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import Footer from "@/components/Footer";
import ContactUsPoster from "@/components/ContactUsPoster";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Dreamshot",
    description:
      "Reach out to us anytime for support, inquiries, or suggestions. Our dedicated team is ready to assist you promptly and professionally.",
    alternates: {
      canonical: "https://www.dreamshot.art/pricing",
    },
  };


export default function ContactUs() {
    return (
        <div className="pt-20 min-h-screen" >
            <ContactUsPoster />
x
            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    )
}