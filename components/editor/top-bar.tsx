import axios from "axios";

export default function TopBar({ editor, shorten }: { editor?: any; shorten: string }) {
    const handleSave = async () => {
        if (!editor) return;
        // shorten,
        //         content,
        //         title,
        //         tags,
        //         raw,
        //         published,
        //         color,
        //         image,
        const content = editor.getJSON();
        const title = editor.getText().slice(0, 30);
        const tags: string[] = [""]; 
        const raw = editor.getText({ blockSeparator: '\n\n' })
        const published = false;
        const color = "#000000";
        const image = "";

        try {
            await axios.post("/api/post", { shorten, content, title, tags, raw, published, color, image });
            alert("Post saved successfully!");
        } catch (error) {
            alert("Failed to save post.");
        }
    };

    return (
        <div className="flex items-center justify-between px-4 h-12">
            <h1 className="text-lg font-medium">Novo post</h1>
            <div className="flex items-center gap-2">
                <button
                    className={`
                        cursor-pointer
                        border border-gray-400
                        bg-transparent text-black text-sm! 
                        hover:bg-gray-100 hover:border-gray-400 transition-all duration-200
                        px-3 py-1 rounded-md
                    `}
                    onClick={handleSave}
                >
                    Salvar
                </button>
                <button
                    className={`
                        cursor-pointer
                        border border-blue-600
                        bg-blue-600 text-white text-sm! 
                        hover:bg-transparent hover:text-blue-600 transition-all duration-200
                        px-3 py-1 rounded-md
                    `}
                >
                    Publicar
                </button>
            </div>
        </div>
    );
}
