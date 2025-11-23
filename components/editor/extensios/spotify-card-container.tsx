import { useEffect, useState } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import ColorThief from "colorthief";
import type { Editor } from "@tiptap/react";
import useColors from "@/lib/utils/getColors";
import { X } from "lucide-react";

interface SpotifyCardProps {
    editor: Editor;
    // getPos: () => number;
    node: Node & {
        attrs: {
            url: string;
        };
    };
    updateAttributes: (attrs: Record<string, string>) => void;
}

export default function SpotifyCardComponent({ node, editor, updateAttributes }: SpotifyCardProps) {
    const url = node.attrs.url;
    const [meta, setMeta] = useState<any>(null);
    const colors = useColors(meta?.thumbnail_url);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const trackId = url.split("/track/")[1]?.split("?")[0];
        const albumId = url.split("/album/")[1]?.split("?")[0];

        if (!trackId && !albumId) return;

        if (trackId) {
            fetch(
                `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`
            )
                .then((res) => res.json())
                .then((meta) => {
                    setMeta(meta);
                    console.log("buscando musica", url);
                    console.log(meta);
                });
        } else if (albumId) {
            fetch(
                `https://open.spotify.com/oembed?url=https://open.spotify.com/album/${albumId}`
            )
                .then((res) => res.json())
                .then((meta) => {
                    setMeta(meta);
                    console.log("buscando album", url);
                    console.log(meta);
                });
        }
    }, [url]);

    if (!meta)
        return (
            <NodeViewWrapper className="p-4 text-sm text-gray-500">
                Carregando música...
            </NodeViewWrapper>
        );

    return (
        <NodeViewWrapper
            className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3 shadow-sm bg-gray-200"
            style={{
                backgroundImage: `linear-gradient(to right, ${colors.darkVibrant} 20%, transparent 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <button
                className={`
                    bg-slate-800/50 rounded-full p-1 border-0 text-white cursor-pointer
                    hover:bg-slate-800/70 absolute top-2 right-2
                    transition ease-in-out duration-150
                `}
                onClick={() => {
                    editor.chain().focus().deleteCurrentNode().run();
                }}
            >
                <X size={16} />
            </button>
            <img
                src={meta.thumbnail_url}
                alt={meta.title}
                className="size-24 rounded-lg"
            />
            <div className="flex flex-col">
                <strong className="text-sm line-clamp-1 text-ellipsis text-white font-bold">
                    {meta.title}
                </strong>
                <span className="text-xs" style={{ color: colors.muted }}>
                    {meta.author_name}
                </span>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 text-xs mt-1"
                >
                    Abrir no Spotify
                </a>
            </div>
        </NodeViewWrapper>
    );
}
