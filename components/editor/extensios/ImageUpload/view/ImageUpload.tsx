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
            try {
                const pos = getPos();
                const { state, view } = editor as any;
                const nodeAt = state.doc.nodeAt(pos);

                if (!nodeAt) {
                    const cmds: any = editor.commands as any;
                    if (typeof cmds.setImageBlockAt === "function") {
                        editor.chain().focus().setImageBlockAt({ pos, src: url }).run();
                    } else if (typeof cmds.setImageBlock === "function") {
                        editor.chain().focus().setImageBlock({ src: url }).run();
                    } else {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                    return;
                }

                const { schema } = state;
                const imageBlockNodeType = schema.nodes.imageBlock;
                const imageNodeType = schema.nodes.image;

                const newNode = imageBlockNodeType
                    ? imageBlockNodeType.create({ src: url, alt: "" })
                    : imageNodeType
                    ? imageNodeType.create({ src: url, alt: "" })
                    : null;

                if (!newNode) {
                    console.error("No image node type available in schema");
                    return;
                }

                const tr = state.tr.replaceWith(pos, pos + nodeAt.nodeSize, newNode as any);
                view.dispatch(tr);
                view.focus();
            } catch (e) {
                console.error("Failed to replace upload node with image:", e);
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
