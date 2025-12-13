import TextWithLinks from "@/components/Common/TextWithLinks";

interface HowItWorkCardProps {
    step: number;
    title: string;
    bulletPoints: string[];
}

/**
 * Card component for displaying a single step in the How It Works section
 */
export default function HowItWorkCard({ step, title, bulletPoints }: HowItWorkCardProps) {
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-5 gap-3" style={{ backgroundColor: '#F5F5F5' }}>
            <div className="flex items-center justify-start rounded-md">
                <span className="bg-white rounded px-2 py-1">
                    Step {step}
                </span>
            </div>
            <h1 className="text-xl md:text-xl lg:text-2xl text-start font-semibold">
                <TextWithLinks text={title} />
            </h1>
            {bulletPoints.map((point, index) => (
                <p key={index} className="text-gray-500 text-start">
                    <TextWithLinks text={point} />
                </p>
            ))}
        </div>
    );
}