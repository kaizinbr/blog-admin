export async function uploadImageToServer(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown" }));
        throw new Error(err?.error || "Upload failed");
    }

    const json = await res.json();
    return json.url as string;
}
