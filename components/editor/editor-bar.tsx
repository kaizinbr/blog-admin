export default function EditorBar() {
    return (
        <div className="flex items-center justify-between border-b border-b-slate-200 bg-white px-4 py-2 sm:px-6">
            <h1 className="text-lg font-medium">Editor</h1>
            <div className="flex items-center gap-2">
                <button className="btn">Undo</button>
                <button className="btn">Redo</button>
            </div>
        </div>
    );
}
