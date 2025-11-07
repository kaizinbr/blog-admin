export default function TopBar({ editor }: { editor?: any }) {
    return (
        <div className="flex items-center justify-between border-b border-b-slate-200 bg-white px-4 py-2 sm:px-6">
            <h1 className="text-lg font-medium">New Post</h1>
            <div className="flex items-center gap-2">
                <button className="btn">Back</button>
                <button className="btn">Salvar</button>
            </div>
        </div>
    );
}
