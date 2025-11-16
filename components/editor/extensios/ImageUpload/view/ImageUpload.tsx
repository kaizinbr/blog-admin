import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import { ImageUploader } from "./ImageUploader";

export const ImageUpload = ({
    getPos,
    editor,
}: {
    getPos: () => number;
    editor: Editor;
}) => {
    const onUpload = useCallback(
        (url: string) => {
            // insert image block at node position
            try {
                const pos = getPos();
                // use the ImageBlock command to insert at position
                const cmds: any = editor.commands as any;
                if (typeof cmds.setImageBlockAt === "function") {
                    editor.chain().focus().setImageBlockAt({ pos, src: url }).run();
                } else if (typeof cmds.setImageBlock === "function") {
                    editor.chain().focus().setImageBlock({ src: url }).run();
                } else {
                    // fallback: insert an image node
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (e) {
                console.error("Failed to insert image block:", e);
            }
        },
        [getPos, editor],
    );

    return (
        <NodeViewWrapper>
            <div className="p-0 m-0" data-drag-handle>
                <ImageUploader onUpload={onUpload} />
            </div>
        </NodeViewWrapper>
    );
};

export default ImageUpload;
