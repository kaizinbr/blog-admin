import type { Editor } from "@tiptap/react";
import EditorBtn from "@/components/editor/btns/editor-btn";
import { ImageLeftIcon, ImageCenterIcon, ImageRightIcon } from "@/components/editor/extensios/ImageBlock/components/btns";

export const ImageBlockMenu = ({ editor }: { editor: Editor }) => {
    if (!editor) return null;

    return (
            <div className="flex gap-1 px-2">

                <EditorBtn
                    editor={editor}
                    icon={<ImageLeftIcon className="size-4" />}
                    label="imagem left"
                    title="imagem left"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("left").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "left" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("left").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<ImageCenterIcon className="size-4" />}
                    label="imagem center"
                    title="imagem center"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("center").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "center" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("center").run()
                    }
                />
                <EditorBtn
                    editor={editor}
                    icon={<ImageRightIcon className="size-4" />}
                    label="imagem right"
                    title="imagem right"
                    command={(ed) =>
                        ed.chain().focus().setImageBlockAlign("right").run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "right" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().setImageBlockAlign("right").run()
                    }
                />
                {/* <EditorBtn
                    editor={editor}
                    icon={null}
                    label="excluir imagem"
                    title="excluir imagem"
                    command={(ed) =>
                        ed.chain().focus().deleteImageBlock().run()
                    }
                    isActive={(ed) =>
                        ed.isActive("imageBlockAlign", { align: "right" })
                    }
                    canExecute={(ed) =>
                        ed.can().chain().deleteImageBlock().run()
                    }
                /> */}
            </div>
    );
};

export default ImageBlockMenu;
