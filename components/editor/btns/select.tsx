import {
    CheckIcon,
    Combobox,
    Group,
    Input,
    InputBase,
    useCombobox,
} from "@mantine/core";
import {
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Pilcrow,
} from "lucide-react";
import { useState, useEffect } from "react";

import type { Editor } from "@tiptap/react";

export function SelectFont({
    editor,
    data,
}: {
    editor?: Editor | null;
    data: { value: string; label: string }[];
}) {
    if (!editor) return null;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: (eventSource) => {
            if (eventSource === "keyboard") {
                combobox.selectActiveOption();
            } else {
                combobox.updateSelectedOptionIndex("active");
            }
        },
    });

    const [active, setActive] = useState<{
        value: string;
        label: string;
    } | null>(data[0] ?? null);

    // sync with editor selection: show current font family when cursor is inside text
    useEffect(() => {
        const updateFromEditor = () => {
            try {
                const attrs = editor.getAttributes("textStyle") as any;
                const fontFamily = attrs?.fontFamily;
                if (fontFamily) {
                    const selected =
                        data.find((d) => d.value === fontFamily) || null;
                    setActive(
                        selected ?? { value: fontFamily, label: fontFamily }
                    );
                } else {
                    const unset =
                        data.find((d) => d.value === "unset") ||
                        data[0] ||
                        null;
                    setActive(unset as any);
                }
            } catch (e) {
                // ignore
            }
        };

        updateFromEditor();
        editor.on("selectionUpdate", updateFromEditor);
        editor.on("transaction", updateFromEditor);
        return () => {
            editor.off("selectionUpdate", updateFromEditor);
            editor.off("transaction", updateFromEditor);
        };
    }, [editor, data]);

    const options = data.map((item) => (
        <Combobox.Option
            value={item.value}
            key={item.value}
            active={item.value === active?.value}
            className={`
                    ${
                        item.value === active?.value
                            ? "bg-slate-100!"
                            : "hover:bg-slate-50!"
                    }
                `}
        >
            <Group gap="xs">
                <span>{item.label}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            resetSelectionOnOptionHover
            withinPortal={false}
            offset={12}
            transitionProps={{ duration: 200, transition: "pop" }}
            onOptionSubmit={(val) => {
                const selected = data.find((d) => d.value === val) || null;
                setActive(selected);
                combobox.updateSelectedOptionIndex("active");

                if (val === "unset") {
                    editor.chain().focus().unsetFontFamily().run();
                } else {
                    editor
                        .chain()
                        .focus()
                        .setFontFamily(selected?.value || "Newsreader")
                        .run();
                }
            }}
        >
            <Combobox.Target targetType="button">
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<ChevronDown className="size-4" />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    classNames={{
                        input: `
                            cursor-pointer border-none! text-sm h-8 px-2 rounded-lg!
                            hover:bg-slate-100! transition-colors duration-200
                            w-32! overflow-hidden! text-ellipsis! text-left!
                        `,
                    }}
                >
                    {active?.label || (
                        <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown
                classNames={{
                    dropdown:
                        "p-0 rounded-lg! border border-slate-200 shadow-md w-fit!",
                }}
            >
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export function SelectHeading({
    editor,
    data,
}: {
    editor?: Editor | null;
    data: { value: number | any; label: string }[];
}) {
    if (!editor) return null;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: (eventSource) => {
            if (eventSource === "keyboard") {
                combobox.selectActiveOption();
            } else {
                combobox.updateSelectedOptionIndex("active");
            }
        },
    });

    const [active, setActive] = useState<{
        value: number;
        label: string;
    } | null>(data[0] ?? null);

    // sync heading select with editor: display current heading level when cursor is inside a heading
    useEffect(() => {
        const updateFromEditor = () => {
            try {
                const attrs = editor.getAttributes("heading") as any;
                const level = attrs?.level;
                if (typeof level === "number") {
                    const selected =
                        data.find((d) => d.value === level) || null;
                    setActive(selected);
                } else {
                    const paragraph =
                        data.find((d) => d.value === 0) || data[0] || null;
                    setActive(paragraph as any);
                }
            } catch (e) {
                // ignore
            }
        };

        updateFromEditor();
        editor.on("selectionUpdate", updateFromEditor);
        editor.on("transaction", updateFromEditor);
        return () => {
            editor.off("selectionUpdate", updateFromEditor);
            editor.off("transaction", updateFromEditor);
        };
    }, [editor, data]);

    const options = data.map((item) => (
        <Combobox.Option
            value={String(item.value)}
            key={String(item.value)}
            active={item.value === active?.value}
            className={`
                    ${
                        item.value === active?.value
                            ? "bg-slate-100!"
                            : "hover:bg-slate-50!"
                    }
                `}
        >
            <Group gap="xs">
                <span>{item.label}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            resetSelectionOnOptionHover
            withinPortal={false}
            offset={12}
            transitionProps={{ duration: 200, transition: "pop" }}
            onOptionSubmit={(val) => {
                if (val === "0") {
                    const numeric = Number(val);
                    const selected =
                        data.find((d) => d.value === numeric) || null;
                    setActive(selected);
                    combobox.updateSelectedOptionIndex("active");
                    editor.chain().focus().setParagraph().run();
                    return;
                }

                const numeric = Number(val);
                const selected = data.find((d) => d.value === numeric) || null;
                setActive(selected);
                combobox.updateSelectedOptionIndex("active");

                if (selected) {
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: selected.value })
                        .run();
                }
            }}
        >
            <Combobox.Target targetType="button">
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<ChevronDown className="size-4" />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    classNames={{
                        input: `
                            cursor-pointer border-none! text-sm h-8 px-2 rounded-lg!
                            hover:bg-slate-100! transition-colors duration-200
                            w-14! overflow-hidden! text-ellipsis! text-left!
                        `,
                        section: `
                            px-1! w-6!
                        `,
                    }}
                >
                    {active?.value === 0 && <Pilcrow className="size-4" />}
                    {active?.value === 1 && <Heading1 className="size-4" />}
                    {active?.value === 2 && <Heading2 className="size-4" />}
                    {active?.value === 3 && <Heading3 className="size-4" />}
                    {active?.value === 4 && <Heading4 className="size-4" />}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown
                classNames={{
                    dropdown:
                        "p-0 rounded-lg! border border-slate-200 shadow-md w-fit!",
                }}
            >
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export function SelectSize({
    editor,
    data,
}: {
    editor?: Editor | null;
    data: { value: string | any; label: string }[];
}) {
    if (!editor) return null;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: (eventSource) => {
            if (eventSource === "keyboard") {
                combobox.selectActiveOption();
            } else {
                combobox.updateSelectedOptionIndex("active");
            }
        },
    });

    const [active, setActive] = useState<{
        value: string;
        label: string;
    } | null>(data[4]);

    // keep the select in sync with the editor selection
    useEffect(() => {
        const updateActiveFromEditor = () => {
            try {
                const attrs = editor.getAttributes("textStyle") as any;
                const fontSize = attrs?.fontSize;
                if (fontSize) {
                    const selected =
                        data.find((d) => d.value === fontSize) || null;
                        console.log("Selected font size:", selected);
                    setActive(selected ?? { value: fontSize, label: fontSize });
                } else {
                    // no explicit fontSize on selection -> fallback to default (unset)
                    const unset =
                        data.find((d) => d.value === "unset") ||
                        data[4] ||
                        null;
                    setActive(unset as any);
                }
            } catch (e) {
                // ignore
            }
        };

        updateActiveFromEditor();
        editor.on("selectionUpdate", updateActiveFromEditor);
        editor.on("transaction", updateActiveFromEditor);
        return () => {
            editor.off("selectionUpdate", updateActiveFromEditor);
            editor.off("transaction", updateActiveFromEditor);
        };
    }, [editor, data]);

    const options = data.map((item) => (
        <Combobox.Option
            value={item.value}
            key={item.value}
            active={item.value === active?.value}
            className={`
                    ${
                        item.value === active?.value
                            ? "bg-slate-100!"
                            : "hover:bg-slate-50!"
                    }
                `}
        >
            <Group gap="xs">
                <span>{item.label}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            resetSelectionOnOptionHover
            withinPortal={false}
            offset={12}
            classNames={{
                search: "h-6!",
            }}
            transitionProps={{ duration: 200, transition: "pop" }}
            onOptionSubmit={(val) => {
                if (val === "unset") {
                    editor.chain().focus().unsetFontSize().run();
                    return;
                }
                const selected = data.find((d) => d.value === val) || null;
                setActive(selected);
                combobox.updateSelectedOptionIndex("active");

                if (selected) {
                    editor
                        .chain()
                        .focus()
                        .setFontSize(selected?.value || "20")
                        .run();
                }
            }}
        >
            <Combobox.Target targetType="button">
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<ChevronDown className="size-4" />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    classNames={{
                        input: `
                            cursor-pointer border-none! text-sm h-6! px-2 rounded-lg!
                            hover:bg-slate-100! transition-colors duration-200
                            w-16! overflow-hidden! text-ellipsis! text-left!
                        `,
                    }}
                >
                    {active?.label || (
                        <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown
                classNames={{
                    dropdown:
                        "p-0 rounded-lg! border border-slate-200 shadow-md w-fit!",
                }}
            >
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
