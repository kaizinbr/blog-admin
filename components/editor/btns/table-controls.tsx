import React from "react";
import type { Editor } from "@tiptap/react";
import EditorBtn from "./editor-btn";

export default function TableControls({ editor }: { editor?: Editor | null }) {
    if (!editor) return null;

    return (
        <div className="control-group">
            <div className="button-group">
                <EditorBtn
                    editor={editor}
                    label="Insert table"
                    command={(ed) =>
                        ed
                            .chain()
                            .focus()
                            .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true,
                            })
                            .run()
                    }
                />

                <EditorBtn
                    editor={editor}
                    label="Add column before"
                    command={(ed) => ed.chain().focus().addColumnBefore().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Add column after"
                    command={(ed) => ed.chain().focus().addColumnAfter().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Delete column"
                    command={(ed) => ed.chain().focus().deleteColumn().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Add row before"
                    command={(ed) => ed.chain().focus().addRowBefore().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Add row after"
                    command={(ed) => ed.chain().focus().addRowAfter().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Delete row"
                    command={(ed) => ed.chain().focus().deleteRow().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Delete table"
                    command={(ed) => ed.chain().focus().deleteTable().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Merge cells"
                    command={(ed) => ed.chain().focus().mergeCells().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Split cell"
                    command={(ed) => ed.chain().focus().splitCell().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Toggle header column"
                    command={(ed) =>
                        ed.chain().focus().toggleHeaderColumn().run()
                    }
                />

                <EditorBtn
                    editor={editor}
                    label="Toggle header row"
                    command={(ed) => ed.chain().focus().toggleHeaderRow().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Toggle header cell"
                    command={(ed) =>
                        ed.chain().focus().toggleHeaderCell().run()
                    }
                />

                <EditorBtn
                    editor={editor}
                    label="Merge or split"
                    command={(ed) => ed.chain().focus().mergeOrSplit().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Set colspan=2"
                    command={(ed) =>
                        ed.chain().focus().setCellAttribute("colspan", 2).run()
                    }
                />

                <EditorBtn
                    editor={editor}
                    label="Fix tables"
                    command={(ed) => ed.chain().focus().fixTables().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Go to next cell"
                    command={(ed) => ed.chain().focus().goToNextCell().run()}
                />

                <EditorBtn
                    editor={editor}
                    label="Go to previous cell"
                    command={(ed) =>
                        ed.chain().focus().goToPreviousCell().run()
                    }
                />
            </div>
        </div>
    );
}
