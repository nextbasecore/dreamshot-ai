import { PartitionLineLeft, PartitionLineRight } from "../Icons";

export default function TextSeparator({ textSeparatorText }: { textSeparatorText: string }) {
    return (
        <div className="flex items-center justify-center gap-4">
            <PartitionLineLeft
                className="w-32 sm:w-32 md:w-48 lg:w-[272px] h-px " // Shrink line width on mobile to protect text from wrapping
            />
            <p className="text-sm sm:text-base lg:text-lg text-center whitespace-nowrap">
                {textSeparatorText}
            </p>
            <PartitionLineRight
                className="w-32 sm:w-32 md:w-48 lg:w-[272px] h-px" // Mirror responsive scaling for visual balance
            />
        </div>
    )
}