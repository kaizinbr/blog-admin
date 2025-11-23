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
                // aceita tanto /track/:id quanto /album/:id (com eventual segmento /intl...)
                find: /(https?:\/\/open\.spotify\.com(?:\/intl(?:-[^\/\s]+|\/[^\/\s]+))?\/(?:track|album)\/[A-Za-z0-9]+)(\S*)?/gi,
                type: this.type,
                getAttributes: (match) => {
                    // match[1] => URL base até a ID (sem query)
                    // match[2] => query string / sufixo (opcional)
                    const baseUrl = match[1];
                    const suffix = match[2] ?? "";
                    const fullUrl = baseUrl + suffix;
                    // extrai se é track ou album
                    const kindMatch = /\/(track|album)\//i.exec(baseUrl);
                    const kind = kindMatch ? kindMatch[1].toLowerCase() : null;
                    console.log("Spotify URL matched:", fullUrl, "kind:", kind);
                    return { url: fullUrl, kind };
                },
            }),
        ];
    },
    addAttributes() {
        return {
            url: { default: null },
            kind: { default: null },
        };
    },

    parseHTML() {
        return [{ tag: "spotify-card" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["spotify-card", mergeAttributes(HTMLAttributes)];
    },

    addCommands() {
        return {
            deleteCurrentNode: () => ({ commands }) => {
                return commands.deleteNode("spotifyCard");
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(SpotifyCardComponent as any);
    },
});
