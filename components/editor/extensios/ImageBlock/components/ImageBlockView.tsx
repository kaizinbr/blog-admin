import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { Popover, Text, Button } from "@mantine/core";
import ImageBlockMenu from "./ImageBlockMenu";

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
    const [isSettingAlt, setIsSettingAlt] = useState(false);

    const wrapperClassName = cn(
        node.attrs.align === "left" ? "ml-0" : "ml-auto",
        node.attrs.align === "right" ? "mr-0" : "mr-auto",
        node.attrs.align === "center" && "mx-auto"
    );

    useEffect(() => {
        const check = () => {
            try {
                // simpler: use editor.isActive for this node type + src
                const active = editor.isActive("imageBlock", {
                    src: node.attrs.src,
                });
                setIsSelected(active);
            } catch (e) {
                setIsSelected(false);
            }
        };

        check();
        editor.on("selectionUpdate", check);
        editor.on("transaction", check);
        return () => {
            editor.off("selectionUpdate", check);
            editor.off("transaction", check);
        };
    }, [editor, getPos, node.attrs.src]);

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
                    <Popover
                        opened={isSelected}
                        position="bottom"
                        withArrow
                        classNames={{
                            dropdown: "p-1! rounded-lg!",
                        }}
                    >
                        <Popover.Target>
                            <div />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <ImageBlockMenu editor={editor} />
                        </Popover.Dropdown>
                    </Popover>

                    {isSelected && (
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <button
                                onClick={onDelete}
                                className="bg-slate-300 text-sm rounded-full p-2 hover:bg-red-50 cursor-pointer transition-colors duration-200"
                                title="Delete image"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    )}
                    {isSelected && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-2">
                            <Popover
                                opened={isSettingAlt}
                                position="top-end"
                                withArrow
                                onClose={setIsSettingAlt.bind(null, false)}
                                clickOutsideEvents={["mouseup", "touchend"]}
                                classNames={{
                                    dropdown: "p-1! rounded-lg!",
                                }}
                            >
                                <Popover.Target>
                                    <button
                                        className="bg-slate-300 text-sm rounded-lg p-2 hover:bg-neutral-100 cursor-pointer transition-colors duration-200"
                                        title="Edit image"
                                        onClick={() =>
                                            setIsSettingAlt(!isSettingAlt)
                                        }
                                    >
                                        <p className="text-xs">Alt</p>
                                    </button>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <div className="flex flex-col gap-2 p-2">
                                        <p className="text-sm font-medium">
                                            Texto alternativo (alt):
                                        </p>
                                        <textarea
                                            className="border border-slate-300 rounded-lg p-1 w-48 outline-none text-sm! resize-none focus:border-blue-500"
                                            rows={3}
                                            defaultValue={node.attrs.alt || ""}
                                            onChange={(e) => {
                                                props.updateAttributes({
                                                    alt: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </Popover.Dropdown>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ImageBlockView;
