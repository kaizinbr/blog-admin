// SpotifyCardComponent.tsx
import React, { useEffect, useState } from "react";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

export default function SpotifyCardComponent({ node }: any) {
    const url = node.attrs.url;
    const [meta, setMeta] = useState<any>(null);

    useEffect(() => {
        const trackId = url.split("/track/")[1]?.split("?")[0];
        if (!trackId) return;

        // 🔹 Requisição ao oEmbed do Spotify (sem precisar de token)
        fetch(
            `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`
        )
            .then((res) => res.json())
            .then(setMeta);
    }, [url]);

    if (!meta)
        return (
            <NodeViewWrapper className="p-4 text-sm text-gray-500">
                Carregando música...
            </NodeViewWrapper>
        );

    return (
        <NodeViewWrapper className="border rounded-xl p-3 flex items-center gap-3 shadow-sm bg-gray-50">
            <img
                src={meta.thumbnail_url}
                alt={meta.title}
                className="w-16 h-16 rounded-lg"
            />
            <div className="flex flex-col">
                <strong className="text-sm">{meta.title}</strong>
                <span className="text-xs text-gray-500">
                    {meta.author_name}
                </span>
                <a
                    href={meta.provider_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-xs mt-1"
                >
                    Abrir no Spotify
                </a>
            </div>
        </NodeViewWrapper>
    );
}
