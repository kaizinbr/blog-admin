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
import EditorBtn from "@/components/editor/btns/editor-btn";
import TableControls from "@/components/editor/btns/table-controls";

export default function EditorBar({ editor }: { editor?: Editor | null }) {
    if (!editor) {
        return null; // or render a loading state
    }

    // const editorState = useEditorState({
    //     editor,
    //     selector: (ctx) => {
    //         return {
    //             // marks
    //             isBold: ctx.editor.isActive("bold") ?? false,
    //             canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

    //             isItalic: ctx.editor.isActive("italic") ?? false,
    //             canItalic:
    //                 ctx.editor.can().chain().toggleItalic().run() ?? false,

    //             isStrike: ctx.editor.isActive("strike") ?? false,
    //             canStrike:
    //                 ctx.editor.can().chain().toggleStrike().run() ?? false,

    //             isUnderline: ctx.editor.isActive("underline") ?? false,
    //             canUnderline:
    //                 ctx.editor.can().chain().toggleUnderline().run() ?? false,

    //             isCode: ctx.editor.isActive("code") ?? false,
    //             canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

    //             isHighlight: ctx.editor.isActive("highlight") ?? false,
    //             canHighlight:
    //                 ctx.editor.can().chain().toggleHighlight().run() ?? false,

    //             isSubscript: ctx.editor.isActive("subscript") ?? false,
    //             canSubscript:
    //                 ctx.editor.can().chain().toggleSubscript().run() ?? false,
    //             isSuperscript: ctx.editor.isActive("superscript") ?? false,
    //             canSuperscript:
    //                 ctx.editor.can().chain().toggleSuperscript().run() ?? false,

    //             isAlignLeft: ctx.editor.isActive("alignLeft") ?? false,
    //             canAlignLeft:
    //                 ctx.editor.can().chain().setTextAlign("left").run() ??
    //                 false,

    //             isAlignCenter: ctx.editor.isActive("alignCenter") ?? false,
    //             canAlignCenter:
    //                 ctx.editor.can().chain().setTextAlign("center").run() ??
    //                 false,

    //             isAlignRight: ctx.editor.isActive("alignRight") ?? false,
    //             canAlignRight:
    //                 ctx.editor.can().chain().setTextAlign("right").run() ??
    //                 false,

    //             isAlignJustify: ctx.editor.isActive("alignJustify") ?? false,
    //             canAlignJustify:
    //                 ctx.editor.can().chain().setTextAlign("justify").run() ??
    //                 false,

    //             //nodes
    //             isBlockquote: ctx.editor.isActive("blockquote") ?? false,
    //             canBlockquote:
    //                 ctx.editor.can().chain().toggleBlockquote().run() ?? false,
    //         };
    //     },
    // });

    return (
        <div
            className={`
            flex items-center border-b border-b-slate-200 bg-white px-4 py-2 sm:px-6
            gap-2 flex-wrap
        `}
        >
            <EditorBtn
                editor={editor}
                icon={<Bold className="size-5" />}
                title="Negrito"
                command={(ed) => ed.chain().focus().toggleBold().run()}
                isActive={(ed) => ed.isActive("bold")}
                canExecute={(ed) => ed.can().chain().toggleBold().run()}
            />

            <EditorBtn
                editor={editor}
                icon={<Italic className="size-5" />}
                title="Itálico"
                command={(ed) => ed.chain().focus().toggleItalic().run()}
                isActive={(ed) => ed.isActive("italic")}
                canExecute={(ed) => ed.can().chain().toggleItalic().run()}
            />

            <EditorBtn
                editor={editor}
                icon={<Underline className="size-5" />}
                title="Sublinhado"
                command={(ed) => ed.chain().focus().toggleUnderline().run()}
                isActive={(ed) => ed.isActive("underline")}
                canExecute={(ed) => ed.can().chain().toggleUnderline().run()}
            />

            <EditorBtn
                editor={editor}
                icon={<Strikethrough className="size-5" />}
                title="Tachado"
                command={(ed) => ed.chain().focus().toggleStrike().run()}
                isActive={(ed) => ed.isActive("strike")}
                canExecute={(ed) => ed.can().chain().toggleStrike().run()}
            />

            <div className="border-l h-6 ml-2"></div>

            <EditorBtn
                editor={editor}
                icon={<AlignLeft className="size-5" />}
                title="Alinhar à esquerda"
                command={(ed) => ed.chain().focus().setTextAlign("left").run()}
                isActive={(ed) => ed.isActive({ textAlign: "left" })}
                canExecute={(ed) => ed.can().chain().setTextAlign("left").run()}
            />

            <EditorBtn
                editor={editor}
                icon={<AlignCenter className="size-5" />}
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
                icon={<AlignRight className="size-5" />}
                title="Alinhar à direita"
                command={(ed) => ed.chain().focus().setTextAlign("right").run()}
                isActive={(ed) => ed.isActive({ textAlign: "right" })}
                canExecute={(ed) =>
                    ed.can().chain().setTextAlign("right").run()
                }
            />

            <EditorBtn
                editor={editor}
                icon={<AlignJustify className="size-5" />}
                title="Justificar"
                command={(ed) =>
                    ed.chain().focus().setTextAlign("justify").run()
                }
                isActive={(ed) => ed.isActive({ textAlign: "justify" })}
                canExecute={(ed) =>
                    ed.can().chain().setTextAlign("justify").run()
                }
            />

            <div className="border-l h-6 ml-2"></div>

            <EditorBtn
                editor={editor}
                icon={null}
                label="Invisiveis"
                title="Caracteres invisíveis"
                command={(ed) => ed.commands.toggleInvisibleCharacters()}
                isActive={() => false}
                canExecute={() => true}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Código"
                title="Código"
                command={(ed) => ed.chain().focus().toggleCode().run()}
                isActive={(ed) => ed.isActive("code")}
                canExecute={(ed) => ed.can().chain().toggleCode().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Highlight"
                title="Highlight"
                command={(ed) => ed.chain().focus().toggleHighlight().run()}
                isActive={(ed) => ed.isActive("highlight")}
                canExecute={(ed) => ed.can().chain().toggleHighlight().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Subscript"
                title="Subscript"
                command={(ed) => ed.chain().focus().toggleSubscript().run()}
                isActive={(ed) => ed.isActive("subscript")}
                canExecute={(ed) => ed.can().chain().toggleSubscript().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Superscript"
                title="Superscript"
                command={(ed) => ed.chain().focus().toggleSuperscript().run()}
                isActive={(ed) => ed.isActive("superscript")}
                canExecute={(ed) => ed.can().chain().toggleSuperscript().run()}
            />

            <div className="border-l h-6 ml-2"></div>

            <EditorBtn
                editor={editor}
                icon={null}
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

            <EditorBtn
                editor={editor}
                icon={null}
                label="blockquote"
                title="Blockquote"
                command={(ed) => ed.chain().focus().toggleBlockquote().run()}
                isActive={(ed) => ed.isActive("blockquote")}
                canExecute={(ed) => ed.can().chain().toggleBlockquote().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Lista de Tarefas"
                title="Lista de Tarefas"
                command={(ed) => ed.chain().focus().toggleTaskList().run()}
                isActive={(ed) => ed.isActive("taskList")}
                canExecute={(ed) => ed.can().chain().toggleTaskList().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="lista de itens"
                title="Lista de Itens"
                command={(ed) => ed.chain().focus().toggleBulletList().run()}
                isActive={(ed) => ed.isActive("bulletList")}
                canExecute={(ed) => ed.can().chain().toggleBulletList().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="Lista numerada"
                title="Lista numerada"
                command={(ed) => ed.chain().focus().toggleOrderedList().run()}
                isActive={(ed) => ed.isActive("orderedList")}
                canExecute={(ed) => ed.can().chain().toggleOrderedList().run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="codeblock"
                title="Code Block"
                command={(ed) => ed.chain().focus().toggleCodeBlock().run()}
                isActive={(ed) => ed.isActive("codeBlock")}
                canExecute={(ed) => ed.can().chain().toggleCodeBlock().run()}
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

            <div className="border-l h-6 ml-2"></div>

            <EditorBtn
                editor={editor}
                icon={null}
                label="titulo 1"
                title="Titulo 1"
                command={(ed) =>
                    ed.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={(ed) => ed.isActive("heading", { level: 1 })}
                canExecute={(ed) =>
                    ed.can().chain().toggleHeading({ level: 1 }).run()
                }
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="titulo 2"
                title="Titulo 2"
                command={(ed) =>
                    ed.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={(ed) => ed.isActive("heading", { level: 2 })}
                canExecute={(ed) =>
                    ed.can().chain().toggleHeading({ level: 2 }).run()
                }
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="titulo 3"
                title="Titulo 3"
                command={(ed) =>
                    ed.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={(ed) => ed.isActive("heading", { level: 3 })}
                canExecute={(ed) =>
                    ed.can().chain().toggleHeading({ level: 3 }).run()
                }
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="linha horizontal"
                title="Horizontal Rule"
                command={(ed) => ed.chain().focus().setHorizontalRule().run()}
                isActive={(ed) => ed.isActive("horizontalRule")}
                canExecute={(ed) => ed.can().chain().setHorizontalRule().run()}
            />
            <br />

            <EditorBtn
                editor={editor}
                icon={null}
                label="desfazer"
                title="undo"
                command={(ed) => ed.chain().focus().undo().run()}
                isActive={(ed) => ed.isActive("undo")}
                canExecute={(ed) => ed.can().chain().undo().run()}
            />
            <EditorBtn
                editor={editor}
                icon={null}
                label="refazer"
                title="redo"
                command={(ed) => ed.chain().focus().redo().run()}
                isActive={(ed) => ed.isActive("redo")}
                canExecute={(ed) => ed.can().chain().redo().run()}
            />

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
                command={(ed) => ed.chain().focus().setImageBlockAlign("left").run()}
                isActive={(ed) => ed.isActive("imageBlockAlign", { align: "left" })}
                canExecute={(ed) => ed.can().chain().setImageBlockAlign("left").run()}
            />

            <EditorBtn
                editor={editor}
                icon={null}
                label="imagem center"
                title="imagem center"
                command={(ed) => ed.chain().focus().setImageBlockAlign("center").run()}
                isActive={(ed) => ed.isActive("imageBlockAlign", { align: "center" })}
                canExecute={(ed) => ed.can().chain().setImageBlockAlign("center").run()}
            />
            <EditorBtn
                editor={editor}
                icon={null}
                label="imagem right"
                title="imagem right"
                command={(ed) => ed.chain().focus().setImageBlockAlign("right").run()}
                isActive={(ed) => ed.isActive("imageBlockAlign", { align: "right" })}
                canExecute={(ed) => ed.can().chain().setImageBlockAlign("right").run()}
            />
            {/* <EditorBtn
                editor={editor}
                icon={null}
                label="excluir imagem"
                title="excluir imagem"
                command={(ed) => ed.chain().focus().deleteImageBlock().run()}
                isActive={(ed) => ed.isActive("imageBlockAlign", { align: "right" })}
                canExecute={(ed) => ed.can().chain().deleteImageBlock().run()}
            /> */}

            <select
                name="font-family"
                id="font-family"
                onChange={(e) => {
                    const font = e.target.value;
                    if (font === "unset") {
                        editor.chain().focus().unsetFontFamily().run();
                    } else {
                        editor
                            .chain()
                            .focus()
                            .setMark("textStyle", { fontFamily: font })
                            .run();
                    }
                }}
                defaultValue=""
            >
                <option value="unset">Fonte</option>
                <option value="arial">Arial</option>
                <option value="times-new-roman">Times New Roman</option>
                <option value="courier-new">Courier New</option>
                <option value="georgia">Georgia</option>
                <option value="verdana">Verdana</option>
            </select>

            <select
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
            </select>

            {/* <TableControls editor={editor} /> */}
        </div>
    );
}
