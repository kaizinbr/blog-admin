import EditorBtn from "@/components/editor/btns/editor-btn";
import { Popover, Text, Button, Input, Group } from "@mantine/core";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { CornerDownLeft, Unlink, ExternalLink } from "lucide-react";

import type { Editor } from "@tiptap/react";

export default function LinkBtn({ editor }: { editor?: Editor | null }) {
    if (!editor) return null;

    const label = "Link";
    const title = "Insert or edit link";
    const [linkUrl, setLinkUrl] = useState("");

    useEffect(() => {
        const activefromEditor = () => {
            try {
                if (editor.isActive("link")) {
                    const attrs = editor.getAttributes("link") as any;
                    setLinkUrl(attrs?.href ?? "");
                } else {
                    setLinkUrl("");
                }
            } catch (e) {
                setLinkUrl("");
            }
        };

        activefromEditor();
        editor.on("selectionUpdate", activefromEditor);
        editor.on("transaction", activefromEditor);
        return () => {
            editor.off("selectionUpdate", activefromEditor);
            editor.off("transaction", activefromEditor);
        };
    }, [editor]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt("Enter the URL", linkUrl);
        if (url !== null) {
            setLinkUrl(url);
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        }
    };
    const [opened, setOpened] = useState(false);

    const openPopover = () => {
        try {
            const attrs = editor.getAttributes("link") as any;
            setLinkUrl(attrs?.href ?? "");
        } catch (e) {
            setLinkUrl("");
        }
        setOpened(true);
    };

    const closePopover = () => setOpened(false);

    const handleSave = () => {
        const url = linkUrl?.trim();
        if (!url) return;
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        closePopover();
    };

    const handleRemove = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        setLinkUrl("");
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
                dropdown: "p-2! rounded-lg! border border-slate-300",
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
                    <Link className="size-4" />
                </button>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="flex flex-row divide-x border-slate-300">
                    <div className="flex flex-row gap-1 pr-2">
                        <input
                            placeholder="https://example.com"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSave();
                                }
                            }}
                            className="text-sm! rounded-lg border-none! outline-none! focus:ring-0! pl-2"
                        />
                        <button
                            className="cursor-pointer p-2 rounded-lg bg-transparent hover:bg-slate-200 transition-colors duration-200"
                            onClick={handleSave}
                            title="Apply link"
                        >
                            <CornerDownLeft size={16} />
                        </button>
                    </div>

                    <div className="flex justify-end gap-1 pl-2">
                        <button
                            className="cursor-pointer p-2 rounded-lg bg-transparent hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50"
                            color="red"
                            onClick={handleRemove}
                            title="Remove link"
                            disabled={!linkUrl}
                        >
                            <Unlink className="text-red-600" size={16} />
                        </button>
                        <NextLink
                            href={`https://${linkUrl.replace(
                                /^https?:\/\//,
                                ""
                            )}`}
                            className="cursor-pointer p-2 rounded-lg bg-transparent hover:bg-slate-200 transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open link in new tab"
                            aria-disabled={!linkUrl}
                        >
                            <ExternalLink size={16} />
                        </NextLink>
                    </div>
                </div>
            </Popover.Dropdown>
        </Popover>
    );
}
