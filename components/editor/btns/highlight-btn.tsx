import EditorBtn from "@/components/editor/btns/editor-btn";
import { Popover, ColorPicker } from "@mantine/core";
import { Highlighter, Eraser } from "lucide-react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { generateSwatches } from "@/components/editor/btns/generateSwatches";

import type { Editor } from "@tiptap/react";

export default function HighlightBtn({ editor }: { editor?: Editor | null }) {
    if (!editor) return null;

    const label = "Highlight";
    const title = "Insert or edit highlight";
    const [color, setColor] = useState("");


    const [opened, setOpened] = useState(false);

    const closePopover = () => setOpened(false);

    const handleEdit = (value: string) => {
        console.log("handleEdit value:", value);
        editor.chain().focus().setHighlight({ color: value }).run();
        setColor(value);
    };

    const handleRemove = () => {
        editor.chain().focus().unsetHighlight().run();
        closePopover();
    };

    return (
        <Popover
            width={334}
            withArrow
            shadow="md"
            position="bottom"
            onClose={setOpened.bind(null, false)}
            clickOutsideEvents={["mouseup", "touchend"]}
            classNames={{
                dropdown: "p-2! rounded-lg! border border-slate-300 w-44!",
            }}
        >
            <Popover.Target>
                <button
                    type="button"
                    aria-pressed={opened}
                    title={title ?? label}
                    onClick={setOpened.bind(null, !opened)}
                    className={`
                        icon-button p-2 rounded-lg hover:bg-slate-100 
                        cursor-pointer disabled:cursor-not-allowed
                        disabled:opacity-50
                        transition-colors duration-200
                        ${opened ? "is-active bg-slate-100" : ""} 
                    `}
                >
                    <Highlighter className="size-4" />
                </button>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="flex flex-col ">
                    <button
                        className=" w-full flex text-center justify-center cursor-pointer items-center gap-2 mb-2 px-2 py-1 rounded hover:bg-slate-100"
                        onClick={handleRemove}
                    >
                        <Eraser className="size-4" />
                        Sem cor
                    </button>
                    <div className="flex flex-row gap-1">
                        <ColorPicker
                            format="hex"
                            value={color}
                            onChange={handleEdit}
                            fullWidth
                            swatchesPerRow={8}
                            swatches={generateSwatches()}
                            size="xs"
                            className="p-0 m-0"
                        />
                    </div>
                </div>
            </Popover.Dropdown>
        </Popover>
    );
}

    