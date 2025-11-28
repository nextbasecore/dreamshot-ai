import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import Footer from "@/components/Footer";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 ">
            {/* Main 404 Content */}
            <div className="flex flex-col mt-30 max-w-2xl items-center justify-center text-center mx-auto flex-1">
                {/* 404 Number Display */}
                <div className="mb-8">
                    <img src="/assets/not-found.png" alt="404" className="w-full h-full object-cover" />
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-md max-w-md text-muted-foreground">
                        You seem to have reached a page that doesn&apos;t exist or may never exist. Turn back now, traveler.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
                    <Button
                        variant="dark"
                        size="lg"
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <HomeIcon className="w-5 h-5" />
                            Go to Home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <Link href="/all-tools" className="flex items-center gap-2">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Browse All Tools
                        </Link>
                    </Button>
                </div>

            </div>

        </div>
    );
}
