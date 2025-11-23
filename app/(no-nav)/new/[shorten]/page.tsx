import Editor from "@/components/editor/editor-main";
import { prisma } from "@/lib/prisma";

export default async function New({
    params,
}: {
    params: Promise<{ shorten: string }>;
}) {
    const shorten = (await params).shorten;
    const post = await prisma.post.findUnique({
        where: { shorten },
    });

    console.log("New post page, shorten:", shorten, "post:", post);

    const content = post?.content || "";

    return (
        <div className="relative max-w-3xl w-full mx-auto mt-8 mb-16 px-4">
            <Editor shorten={shorten} content={content} />
        </div>
    );
}
