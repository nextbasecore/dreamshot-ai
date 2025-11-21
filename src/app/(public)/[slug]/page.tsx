import { loadToolConfigBySlug } from "@/config/tools.server";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string };
}


const DirectToolPage = async ({ params }: Props) => {
    const { slug } = params;
    console.log(slug, "slug");

    const toolData =
        await loadToolConfigBySlug(slug);
    if (!toolData) {
        return notFound();
    }

    if (toolData.postPrefix) {
        return notFound();
    }
    
}