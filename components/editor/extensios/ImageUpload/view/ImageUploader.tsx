import { useDropZone, useFileUpload, useUploader } from "./hooks";
import { FileImage, CloudUpload, ImageUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent, useCallback } from "react";

export const ImageUploader = ({
    onUpload,
}: {
    onUpload: (url: string) => void;
}) => {
    const { loading, uploadFile } = useUploader({ onUpload });
    const { handleUploadClick, ref } = useFileUpload();
    const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
        uploader: uploadFile,
    });

    const onFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) =>
            e.target.files ? uploadFile(e.target.files[0]) : null,
        [uploadFile]
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    const wrapperClass = cn(
        `flex flex-col items-center justify-center px-8 py-10 
        rounded-lg bg-opacity-80 
        border-2 border-dashed border-slate-300
        cursor-pointer min-h-[10rem] transition-colors`,
        draggedInside && "bg-neutral-100"
    );

    return (
        <div
            className={wrapperClass}
            onDrop={onDrop}
            onDragOver={onDragEnter}
            onDragLeave={onDragLeave}
            contentEditable={false} 
            onClick={handleUploadClick}
        >
            <ImageUp className="size-12 mb-4 text-black opacity-20" />
            <div className=" items-center justify-center text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
                <span>
                    {draggedInside ? "Solte a imagem aqui" : "Arraste e solte ou"}{" "}
                </span>
                <button className="underline cursor-pointer">
                    clique para carregar
                </button>
            </div>
            <input
                className="w-0 h-0 overflow-hidden opacity-0"
                ref={ref}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif"
                onChange={onFileChange}
            />
        </div>
    );
};

export default ImageUploader;
