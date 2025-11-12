import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
} from "lucide-react";

import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";

export default function EditorBar({ editor }: { editor?: Editor | null }) {
    if (!editor) {
        return null; // or render a loading state
    }

    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive("bold") ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

                isItalic: ctx.editor.isActive("italic") ?? false,
                canItalic:
                    ctx.editor.can().chain().toggleItalic().run() ?? false,

                isStrike: ctx.editor.isActive("strike") ?? false,
                canStrike:
                    ctx.editor.can().chain().toggleStrike().run() ?? false,

                isUnderline: ctx.editor.isActive("underline") ?? false,
                canUnderline:
                    ctx.editor.can().chain().toggleUnderline().run() ?? false,

                isCode: ctx.editor.isActive("code") ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

                isHighlight: ctx.editor.isActive("highlight") ?? false,
                canHighlight:
                    ctx.editor.can().chain().toggleHighlight().run() ?? false,

                isAlignLeft: ctx.editor.isActive("alignLeft") ?? false,
                canAlignLeft:
                    ctx.editor.can().chain().setTextAlign("left").run() ??
                    false,

                isAlignCenter: ctx.editor.isActive("alignCenter") ?? false,
                canAlignCenter:
                    ctx.editor.can().chain().setTextAlign("center").run() ??
                    false,

                isAlignRight: ctx.editor.isActive("alignRight") ?? false,
                canAlignRight:
                    ctx.editor.can().chain().setTextAlign("right").run() ??
                    false,

                isAlignJustify: ctx.editor.isActive("alignJustify") ?? false,
                canAlignJustify:
                    ctx.editor.can().chain().setTextAlign("justify").run() ??
                    false,
            };
        },
    });

    return (
        <div
            className={`
            flex items-center border-b border-b-slate-200 bg-white px-4 py-2 sm:px-6
            gap-2
        `}
        >
            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isBold ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
            >
                <Bold className="size-5" />
            </button>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isItalic ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
            >
                <Italic className="size-5" />
            </button>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isUnderline ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editorState.canUnderline}
            >
                <Underline className="size-5" />
            </button>
            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isStrike ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
            >
                <Strikethrough className="size-5" />
            </button>
            <div className="border-l h-6 ml-2"></div>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isAlignLeft ? "is-active bg-slate-100" : ""}
                `}
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                disabled={!editorState.canAlignLeft}
            >
                <AlignLeft className="size-5" />
            </button>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isAlignCenter ? "is-active bg-slate-100" : ""}
                `}
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                disabled={!editorState.canAlignCenter}
            >
                <AlignCenter className="size-5" />
            </button>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isAlignRight ? "is-active bg-slate-100" : ""}
                `}
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                disabled={!editorState.canAlignRight}
            >
                <AlignRight className="size-5" />
            </button>

            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${
                        editorState.isAlignJustify
                            ? "is-active bg-slate-100"
                            : ""
                    }
                `}
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                disabled={!editorState.canAlignJustify}
            >
                <AlignJustify className="size-5" />
            </button>

            <div className="border-l h-6 ml-2"></div>

            <button onClick={() => editor.commands.toggleInvisibleCharacters()}>
                caracteres invisiveis
            </button>
            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isCode ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
            >
                código
            </button>
            <button
                className={`
                    icon-button p-2 rounded-sm hover:bg-slate-100
                    ${editorState.isHighlight ? "is-active bg-slate-100" : ""}
                `}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                disabled={!editorState.canHighlight}
            >
                highlight
            </button>


        </div>
    );
}
