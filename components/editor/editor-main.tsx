"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "@/components/editor/extensions";
import TopBar from "@/components/editor/top-bar";
import EditorBar from "@/components/editor/editor-bar";
import type { Editor } from "@tiptap/react";

const MainEditor = () => {
    const editor: Editor | null = useEditor({
        editorProps: {
            attributes: {
                class: "editor-main prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: defaultExtensions,
        content:
            '<p class="paragrafo">— Meu nome é Choi Beomgyu, prazer — digo, animado.</p><p class="paragrafo">O garoto me olha, parando de esfregar o chão por um instante. Ele se apoia no cabo do esfregão antes de dizer:</p><p class="paragrafo" >— <em>Choi Yeonjun</em> — e acena com a cabeça.</p><p class="paragrafo" >Sua voz é leve – se é que uma voz pode ser assim – e baixa, como se ele não quisesse que outras pessoas escutassem. <em>Que outras pessoas?</em> Você me pergunta. Que outras pessoas? Pergunto-lhe de volta.</p><p class="paragrafo" >Sua resposta me faz pensar se ele não tem intenção de conversar e vai achar um saco se eu ficar puxando assunto, contudo seu olhar permanece em mim. Ele não volta a esfregar o chão e apenas me encara, como se eu tivesse cometido um ato extremamente heroico ou um crime horripilante; é difícil ler seu olhar.</p><p class="paragrafo" >Um trovão explode fora do ginásio. O barulho dura mais aqui dentro do que em um local aberto, o que não é nada bom. Não que eu tenha medo disso, puts, imagina ter medo de um barulho a quilômetros de distância. Acontece que eu também não sou muito fã de sons altos, apenas isso.</p><p class="paragrafo" >— Você tá bem? — Yeonjun pergunta, agachado ao meu lado.</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        autofocus: true,
    });

    return (
        <div
            className={`
                    text-container
                    flex flex-col
                    w-full
                `}
        >
            {/* top bar, com titulo, botoes de voltar e salvar */}
            <TopBar editor={editor} />

            {/* editor bar, com botoes de formatacao */}
            <EditorBar editor={editor} />

            {/* editor */}
            <EditorContent
                className="flex min-h-[calc(100vh-132px)] mt-8"
                editor={editor}
            />
        </div>
    );
};

export default MainEditor;
