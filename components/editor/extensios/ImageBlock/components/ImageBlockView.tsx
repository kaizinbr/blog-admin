import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState, useEffect } from "react";

interface ImageBlockViewProps {
    editor: Editor;
    getPos: () => number;
    node: Node & {
        attrs: {
            src: string;
        };
    };
    updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
    const { editor, getPos, node } = props;
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const { src } = node.attrs;
    const [isResizing, setIsResizing] = useState(false);
    const resizeStartX = useRef(0);
    const resizeStartWidth = useRef<number | null>(null);
    const [isSelected, setIsSelected] = useState(false);

    const wrapperClassName = cn(
        node.attrs.align === "left" ? "ml-0" : "ml-auto",
        node.attrs.align === "right" ? "mr-0" : "mr-auto",
        node.attrs.align === "center" && "mx-auto"
    );

    const onClick = useCallback(() => {
        editor.commands.setNodeSelection(getPos());
    }, [getPos, editor.commands]);

    const onDelete = useCallback(() => {
        try {
            editor
                .chain()
                .focus()
                .setNodeSelection(getPos())
                .deleteSelection()
                .run();
        } catch (e) {
            const pos = getPos();
            const tr = editor.state.tr.delete(pos, pos + node.nodeSize);
            editor.view.dispatch(tr);
        }
    }, [editor, getPos, node]);

    return (
        <NodeViewWrapper>
            <div
                className={wrapperClassName}
                style={{ width: "fit-content", position: "relative" }}
            >
                <div contentEditable={false} ref={imageWrapperRef}>
                    <img
                        className="block"
                        src={src}
                        alt={node.attrs.alt ?? ""}
                        onClick={onClick}
                        style={{
                            width: node.attrs.width ?? "100%",
                            height: "auto",
                        }}
                        data-keep-ratio="true"
                    />

                    {isSelected && (
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <button
                                onClick={onDelete}
                                className="bg-white/90 text-sm rounded px-2 py-1 border hover:bg-red-50"
                                title="Delete image"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* <div className="text-xs text-neutral-500 mt-2 text-center break-all">
                        {fileName}
                    </div> */}
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ImageBlockView;
