"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TopBar from "@/components/editor/top-bar";
import EditorBar from "@/components/editor/editor-bar";

const Editor = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "editor-main prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: [StarterKit],
        content: "",
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        autofocus: true,
    });

    return (
        <div
            className={`
                    text-container
                    flex flex-col
                    w-full
                `}
        >   
            {/* top bar, com titulo, botoes de voltar e salvar */}
            <TopBar />

            {/* editor bar, com botoes de formatacao */}
            {/* <EditorBar /> */}

            {/* editor */}
            <EditorContent
                className="flex min-h-[calc(100vh-132px)]"
                editor={editor}
            />
        </div>
    );
};

export default Editor;
