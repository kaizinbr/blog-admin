import Editor from "@/components/editor/editor-main"


export default async function New({ params }: { params: Promise<{ shorten: string }> }) {

    const shorten = (await params).shorten;

    return (
        <div className="relative max-w-4xl w-full mx-auto mt-8 mb-16 px-4">
            <Editor shorten={shorten} />
        </div>
    )
}