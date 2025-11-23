"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { defaultExtensions } from "@/components/editor/extensions";
import TopBar from "@/components/editor/top-bar";
import EditorBar from "@/components/editor/editor-bar";
import type { Editor } from "@tiptap/react";
import { JsonArray } from "@prisma/client/runtime/library";

export default function MainEditor({
    shorten,
    content,
}: {
    shorten: string;
    content: JsonArray | any;
}) {
    console.log("Editor main, shorten:", shorten, "content:", content);
    const editor: Editor | null = useEditor({
        editorProps: {
            attributes: {
                class: "editor-main prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: defaultExtensions,
        content: content,
        immediatelyRender: false,
        autofocus: true,
    });

    return (
        <>
            <div
                className={`
                    fixed top-0 left-0 right-0
                    bg-white/90 backdrop-blur-sm
                    border-b border-gray-200
                    z-50
                `}
            >
                {/* top bar, com titulo, botoes de voltar e salvar */}
                <TopBar editor={editor} shorten={shorten} />
                {/* editor bar, com botoes de formatacao */}
                <EditorBar editor={editor} />
            </div>

            {/* editor */}
            <EditorContent
                className="flex min-h-[calc(100vh-132px)] mt-36 z-40"
                editor={editor}
            />
        </>
    );
}
