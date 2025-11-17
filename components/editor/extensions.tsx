import StarterKit from "@tiptap/starter-kit";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";

import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extensions";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { TableKit } from "@tiptap/extension-table";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import InvisibleCharacters from "@tiptap/extension-invisible-characters";

import FileHandler from "@tiptap/extension-file-handler";

import { ImageUpload } from "@/components/editor/extensios/ImageUpload";
import { ImageBlock } from "@/components/editor/extensios/ImageBlock";

import { uploadImageToServer } from "@/lib/upload";
import { ResizableImage } from "tiptap-extension-resizable-image";

import Youtube from "@tiptap/extension-youtube";

import { SpotifyCard } from "@/components/editor/extensios/spotify-card-extensio";

export type EditorExtensionsOptions = {
    placeholder?: string;
    characterLimit?: number;
    textAlignTypes?: Array<string>;
    codeLowlight?: any;
};

// Initialize lowlight with all languages
const lowlight = createLowlight();
lowlight.register(all);

// Factory that returns a ready-to-use array of extensions.
// Keeps defaults sensible but allows overrides via options.
export function createExtensions(opts: EditorExtensionsOptions = {}): any[] {
    const {
        placeholder = "Escreva algo...",
        characterLimit,
        textAlignTypes = ["heading", "paragraph"],
        codeLowlight,
    } = opts;

    const extensions: any[] = [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3, 4, 5, 6],
                HTMLAttributes: {
                    class: "titulo",
                },
            },
            paragraph: {
                HTMLAttributes: {
                    class: "paragrafo pb-6",
                },
            },
            link: {
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                defaultProtocol: "https",
                protocols: ["http", "https", "mailto"],
            },
        }),
        Superscript,
        Subscript,
        InvisibleCharacters.configure({
            visible: false,
        }),
        Youtube,
        Code.configure({
            HTMLAttributes: {
                class: "codigo-inline",
            },
        }),

        Emoji.configure({
            emojis: gitHubEmojis,
            enableEmoticons: true,
        }),
        CodeBlockLowlight.configure({ lowlight }),
        Highlight.configure({ multicolor: true }),

        // Media
        ImageBlock,
        ImageUpload,
        // ResizableImage,

        // File handling (drag-n-drop, paste)

        FileHandler.configure({
            allowedMimeTypes: [
                "image/png",
                "image/jpeg",
                "image/gif",
                "image/webp",
            ],
            onDrop: (currentEditor, files, pos) => {
                files.forEach(async (file) => {
                    const url = await uploadImageToServer(file);
                    console.log(file, url);

                    currentEditor
                        .chain()
                        .setImageBlockAt({ pos, src: url ?? "" })
                        .focus()
                        .run();
                });
            },
            onPaste: (currentEditor, files) => {
                files.forEach(async (file) => {
                    const url = await uploadImageToServer(file);
                    console.log(file, url);

                    return currentEditor
                        .chain()
                        .setImageBlockAt({
                            pos: currentEditor.state.selection.anchor,
                            src: url ?? "",
                        })
                        .focus()
                        .run();
                });
            },
        }),

        // Cursor helpers
        Dropcursor,
        Gapcursor,

        // Alignment
        TextAlign.configure({
            types: textAlignTypes,
        }),

        // UX helpers
        Placeholder.configure({
            placeholder,
        }),

        // Optional character counter
        ...(typeof characterLimit === "number"
            ? [CharacterCount.configure({ limit: characterLimit })]
            : []),

        // Tables (single Table import; avoid redundant row/cell/header imports)
        TableKit.configure({
            table: { resizable: true },
        }),

        // Task lists / todos
        TaskList,
        TaskItem.configure({
            nested: true,
        }),
        TextStyleKit,
        Typography,

        // Custom Spotify card node
        SpotifyCard.configure({
            HTMLAttributes: { class: "spotify-card-node pb-6" },
        }),
    ];

    return extensions;
}

// Convenience default export and named exports for direct use
export const defaultExtensions: any[] = createExtensions();
export {
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    CodeBlockLowlight,
    Paragraph,
    Text,
    HardBreak,
    Heading,
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    TaskList,
    TaskItem,
    Link,
    Image,
    TextAlign,
    Placeholder,
    CharacterCount,
    TableKit,
    Dropcursor,
    Gapcursor,
    HorizontalRule,
    InvisibleCharacters,
    FileHandler,
    Youtube,
    SpotifyCard,
};
