import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SpotifyCardComponent from "./spotify-card-container";

export const SpotifyCard = Node.create({
    name: "spotifyCard",
    group: "block",
    atom: true, // trata o card como um bloco único

    addPasteRules() {
        return [
            nodePasteRule({
                find: /(https?:\/\/open\.spotify\.com(?:\/intl(?:-[^\/\s]+|\/[^\/\s]+))?\/track\/[A-Za-z0-9]+)(\S*)?/gi,
                type: this.type,
                getAttributes: (match) => {
                    // match[1] => URL base até a ID (sem query)
                    // match[2] => query string / sufixo (opcional)
                    const baseUrl = match[1];
                    const suffix = match[2] ?? "";
                    // se quiser a URL completa com params:
                    const fullUrl = baseUrl + suffix;
                    console.log("Spotify URL matched:", fullUrl);
                    return { url: fullUrl };
                },
            }),
        ];
    },
    addAttributes() {
        return {
            url: { default: null },
        };
    },

    parseHTML() {
        return [{ tag: "spotify-card" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["spotify-card", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(SpotifyCardComponent);
    },
});
