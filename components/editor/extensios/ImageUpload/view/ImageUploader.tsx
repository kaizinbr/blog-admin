
import { useDropZone, useFileUpload, useUploader } from "./hooks";
import { FileImage, CloudUpload  } from 'lucide-react';
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
        [uploadFile],
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
                carregando
            </div>
        );
    }

    const wrapperClass = cn(
        "flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80",
        draggedInside && "bg-neutral-100",
    );

    return (
        <div
            className={wrapperClass}
            onDrop={onDrop}
            onDragOver={onDragEnter}
            onDragLeave={onDragLeave}
            contentEditable={false}
        >
            <FileImage
                className="w-12 h-12 mb-4 text-black dark:text-white opacity-20"
            />
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
                    {draggedInside ? "Drop image here" : "Drag and drop or"}
                </div>
                <div>
                    <button
                        disabled={draggedInside}
                        onClick={handleUploadClick}
                    >
                        <CloudUpload className="w-5 h-5 mr-2" />
                        Upload an image
                    </button>
                </div>
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
