import DashboardPlayground from "../DashboardPlayground";
import TrustedByTile from "./TrustedByTile";
import DashboardHero from "./DashboardHero";

export default function Hero() {
    return (
        <div className="flex flex-col gap-10" style={{
            backgroundImage: 'url(/assets/main-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'

        }}>
            <TrustedByTile />
            <DashboardPlayground />
            {/* Image */}
            <div className="gap-4 w-full h-full mx-auto hidden md:flex relative">
                <DashboardHero />
                {/* Shadow below the image */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-3/4 h-10 rounded-full bg-black/10 blur-xl pointer-events-none z-0" />
            </div>
        </div>
    )
}