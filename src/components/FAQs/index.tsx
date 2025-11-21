import TextSeparator from "../TextSeparator";
import { ArrowDownIcon } from "lucide-react";
import { SingleFaq } from "./FAQsCard";

export default function FAQs() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="FAQs" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Ask Anything, Get Answers
            </h1>

            <div className="w-full max-w-3xl px-4">
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
                <SingleFaq answer="Est Vitae FAo congue ullam elit no cum?" question="Est Vitae FAo congue ullam elit no cum?" />
            </div>
        </div>

    )
}