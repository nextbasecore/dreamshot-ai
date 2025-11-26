import { DashboardTestimonial } from "@/types";

interface TestimonialCardProps {
    review: string;
    name: string;
    designation: string;
}

export default function TestimonialCard({ review, name, designation }: TestimonialCardProps) {
    return (
        <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-md">
            {/* Top section: avatar + name + role */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-lg">
                    {name?.charAt(0) || "?"}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-gray-500">{designation}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Testimonial text */}
            <p className="text-sm text-gray-500">{review}</p>
        </div>
    )
}
