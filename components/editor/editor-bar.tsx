import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Undo,
    Redo,
    Code2,
    Highlighter,
    Subscript,
    Superscript,
    RemoveFormatting,
    Link,
    ListIcon,
    ListOrdered, 
    ListChecks
} from "lucide-react";

import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import EditorBtn from "@/components/editor/btns/editor-btn";
import TableControls from "@/components/editor/btns/table-controls";
import {
    SelectFont,
    SelectHeading,
    SelectSize,
} from "@/components/editor/btns/select";
import LinkBtn from "@/components/editor/btns/link-btn";

const defaultFonts = [
    { value: "unset", label: "Padrão" },
    { value: "arial", label: "Arial" },
    { value: "times-new-roman", label: "Times New Roman" },
];

const heading = [
    { value: 1, label: "Título 1" },
    { value: 2, label: "Título 2" },
    { value: 3, label: "Título 3" },
    { value: 4, label: "Título 4" },
    { value: 0, label: "Parágrafo" },
];

const fontSizes = [
    { value: "12px", label: "12" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
    { value: "28px", label: "28" },
    { value: "32px", label: "32" },
    { value: "36px", label: "36" },
    { value: "40px", label: "40" },
];

export default function EditorBar({ editor }: { editor?: Editor | null }) {
    if (!editor) {
        return null; // or render a loading state
    }

    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                // marks
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

                isSubscript: ctx.editor.isActive("subscript") ?? false,
                canSubscript:
                    ctx.editor.can().chain().toggleSubscript().run() ?? false,
                isSuperscript: ctx.editor.isActive("superscript") ?? false,
                canSuperscript:
                    ctx.editor.can().chain().toggleSuperscript().run() ?? false,

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

                //nodes
                isBlockquote: ctx.editor.isActive("blockquote") ?? false,
                canBlockquote:
                    ctx.editor.can().chain().toggleBlockquote().run() ?? false,
            };
        },
    });

    return (
        <div
            className={`
            flex items-center border-b border-b-slate-200 bg-white px-4 py-2 sm:px-6
            gap-1 flex-wrap
            divide-x divide-slate-200
        `}
        >
            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={<Undo className="size-4" />}
                    title="undo"
                    command={(ed) => ed.chain().focus().undo().run()}
                    isActive={(ed) => ed.isActive("undo")}
                    canExecute={(ed) => ed.can().chain().undo().run()}
                />
                <EditorBtn
                    editor={editor}
                    icon={<Redo className="size-4" />}
                    title="redo"
                    command={(ed) => ed.chain().focus().redo().run()}
                    isActive={(ed) => ed.isActive("redo")}
                    canExecute={(ed) => ed.can().chain().redo().run()}
                />
            </div>
            <div className="flex gap-1 px-2 max-h-8">
                <SelectHeading editor={editor} data={heading} />
                <SelectFont editor={editor} data={defaultFonts} />
                <SelectSize editor={editor} data={fontSizes} />
            </div>
            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={<Bold className="size-4" />}
                    title="Negrito"
                    command={(ed) => ed.chain().focus().toggleBold().run()}
                    isActive={(ed) => ed.isActive("bold")}
                    canExecute={(ed) => ed.can().chain().toggleBold().run()}
                />
                <EditorBtn
                    editor={editor}
                    icon={<Italic className="size-4" />}
                    title="Itálico"
                    command={(ed) => ed.chain().focus().toggleItalic().run()}
                    isActive={(ed) => ed.isActive("italic")}
                    canExecute={(ed) => ed.can().chain().toggleItalic().run()}
                />
                <EditorBtn
                    editor={editor}
                    icon={<Underline className="size-4" />}
                    title="Sublinhado"
                    command={(ed) => ed.chain().focus().toggleUnderline().run()}
                    isActive={(ed) => ed.isActive("underline")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleUnderline().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<Strikethrough className="size-4" />}
                    title="Tachado"
                    command={(ed) => ed.chain().focus().toggleStrike().run()}
                    isActive={(ed) => ed.isActive("strike")}
                    canExecute={(ed) => ed.can().chain().toggleStrike().run()}
                />
                <EditorBtn
                    editor={editor}
                    icon={<Code2 className="size-4" />}
                    label="Código"
                    title="Código"
                    command={(ed) => ed.chain().focus().toggleCode().run()}
                    isActive={(ed) => ed.isActive("code")}
                    canExecute={(ed) => ed.can().chain().toggleCode().run()}
                />
                <LinkBtn editor={editor} />
                <EditorBtn
                    editor={editor}
                    icon={<Highlighter className="size-4" />}
                    label="Highlight"
                    title="Highlight"
                    command={(ed) => ed.chain().focus().toggleHighlight().run()}
                    isActive={(ed) => ed.isActive("highlight")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleHighlight().run()
                    }
                />
            </div>
            
            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={<ListIcon className="size-4" />}
                    label="lista de itens"
                    title="Lista de Itens"
                    command={(ed) =>
                        ed.chain().focus().toggleBulletList().run()
                    }
                    isActive={(ed) => ed.isActive("bulletList")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleBulletList().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<ListOrdered className="size-4" />}
                    label="Lista numerada"
                    title="Lista numerada"
                    command={(ed) =>
                        ed.chain().focus().toggleOrderedList().run()
                    }
                    isActive={(ed) => ed.isActive("orderedList")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleOrderedList().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<ListChecks className="size-4" />}
                    label="Lista de Tarefas"
                    title="Lista de Tarefas"
                    command={(ed) => ed.chain().focus().toggleTaskList().run()}
                    isActive={(ed) => ed.isActive("taskList")}
                    canExecute={(ed) => ed.can().chain().toggleTaskList().run()}
                />
            </div>

            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={<AlignLeft className="size-4" />}
                    title="Alinhar à esquerda"
                    command={(ed) =>
                        ed.chain().focus().setTextAlign("left").run()
                    }
                    isActive={(ed) => ed.isActive({ textAlign: "left" })}
                    canExecute={(ed) =>
                        ed.can().chain().setTextAlign("left").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<AlignCenter className="size-4" />}
                    title="Centralizar"
                    command={(ed) =>
                        ed.chain().focus().setTextAlign("center").run()
                    }
                    isActive={(ed) => ed.isActive({ textAlign: "center" })}
                    canExecute={(ed) =>
                        ed.can().chain().setTextAlign("center").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<AlignRight className="size-4" />}
                    title="Alinhar à direita"
                    command={(ed) =>
                        ed.chain().focus().setTextAlign("right").run()
                    }
                    isActive={(ed) => ed.isActive({ textAlign: "right" })}
                    canExecute={(ed) =>
                        ed.can().chain().setTextAlign("right").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<AlignJustify className="size-4" />}
                    title="Justificar"
                    command={(ed) =>
                        ed.chain().focus().setTextAlign("justify").run()
                    }
                    isActive={(ed) => ed.isActive({ textAlign: "justify" })}
                    canExecute={(ed) =>
                        ed.can().chain().setTextAlign("justify").run()
                    }
                />
            </div>
            
            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={<Subscript className="size-4" />}
                    label="Subscript"
                    title="Subscript"
                    command={(ed) => ed.chain().focus().toggleSubscript().run()}
                    isActive={(ed) => ed.isActive("subscript")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleSubscript().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<Superscript className="size-4" />}
                    label="Superscript"
                    title="Superscript"
                    command={(ed) =>
                        ed.chain().focus().toggleSuperscript().run()
                    }
                    isActive={(ed) => ed.isActive("superscript")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleSuperscript().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<RemoveFormatting className="size-4" />}
                    label="Limpar"
                    title="Clear Formatting"
                    command={(ed) =>
                        ed.chain().focus().clearNodes().unsetAllMarks().run()
                    }
                    isActive={() => false}
                    canExecute={(ed) =>
                        ed.can().chain().clearNodes().unsetAllMarks().run()
                    }
                />
            </div>

            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="Invisiveis"
                    title="Caracteres invisíveis"
                    command={(ed) => ed.commands.toggleInvisibleCharacters()}
                    isActive={() => false}
                    canExecute={() => true}
                />
            </div>

            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="blockquote"
                    title="Blockquote"
                    command={(ed) =>
                        ed.chain().focus().toggleBlockquote().run()
                    }
                    isActive={(ed) => ed.isActive("blockquote")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleBlockquote().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="codeblock"
                    title="Code Block"
                    command={(ed) => ed.chain().focus().toggleCodeBlock().run()}
                    isActive={(ed) => ed.isActive("codeBlock")}
                    canExecute={(ed) =>
                        ed.can().chain().toggleCodeBlock().run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="quebra de linha"
                    title="Hard Break"
                    command={(ed) => ed.chain().focus().setHardBreak().run()}
                    isActive={(ed) => ed.isActive("hardBreak")}
                    canExecute={(ed) => ed.can().chain().setHardBreak().run()}
                />
            </div>

                {/* 
            <div className="flex gap-1 px-2">
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="imagem"
                    title="imagem"
                    command={(ed) => ed.chain().focus().setImageUpload().run()}
                    isActive={(ed) => ed.isActive("imageUpload")}
                    canExecute={(ed) => ed.can().chain().setImageUpload().run()}
                />

                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="imagem left"
                    title="imagem left"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("left").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "left" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("left").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="imagem center"
                    title="imagem center"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("center").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "center" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("center").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={null}
                    label="imagem right"
                    title="imagem right"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("right").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "right" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("right").run()
                    }
                /><EditorBtn
                    editor={editor}
                    icon={null}
                    label="excluir imagem"
                    title="excluir imagem"
                    command={(ed) => ed.chain().focus().deleteImageBlock().run()}
                    isActive={(ed) => ed.isActive("imageBlockAlign", { align: "right" })}
                    canExecute={(ed) => ed.can().chain().deleteImageBlock().run()}
                /> 
            </div>*/}

            {/* <select
                name="font-size"
                id="font-size"
                onChange={(e) => {
                    const size = e.target.value;
                    if (size === "unset") {
                        editor.chain().focus().unsetFontSize().run();
                    } else {
                        editor
                            .chain()
                            .focus()
                            .setMark("textStyle", { fontSize: size })
                            .run();
                    }
                }}
                defaultValue=""
            >
                <option value="unset">Tamanho</option>
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="20px">20</option>
                <option value="24px">24</option>
                <option value="28px">28</option>
                <option value="32px">32</option>
            </select> */}

            {/* <TableControls editor={editor} /> */}
        </div>
    );
}
