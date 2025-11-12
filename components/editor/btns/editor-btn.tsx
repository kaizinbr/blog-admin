import React from "react";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

type EditorBtnProps = {
    editor?: Editor | null;
    command: (editor: Editor) => void;
    isActive?: (editor: Editor) => boolean;
    canExecute?: (editor: Editor) => boolean;
    icon?: React.ReactNode;
    label?: string;
    title?: string;
    className?: string;
    // optional: custom onClick wrapper
    onClick?: (e: React.MouseEvent) => void;
};

export default function EditorBtn({
    editor,
    command,
    isActive,
    canExecute,
    icon,
    label,
    title,
    className = "",
    onClick,
}: EditorBtnProps) {
    if (!editor) return null;

    // useEditorState keeps the component in sync with editor without re-renderar tudo
    const state = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                active: Boolean(isActive ? isActive(ctx.editor) : false),
                enabled: Boolean(canExecute ? canExecute(ctx.editor) : true),
            };
        },
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!state.enabled) return;
        try {
            command(editor);
        } catch (err) {
            // fallback: try to focus and run a chain if available
            try {
                editor.chain().focus().run();
            } catch {
                // swallow
            }
        }
        if (onClick) onClick(e);
    };

    return (
        <button
            type="button"
            aria-pressed={state.active}
            title={title ?? label}
            onClick={handleClick}
            disabled={!state.enabled}
            className={`icon-button p-2 rounded-sm hover:bg-slate-100 ${
                state.active ? "is-active bg-slate-100" : ""
            } ${className}`}
        >
            {icon ?? label}
        </button>
    );
}
