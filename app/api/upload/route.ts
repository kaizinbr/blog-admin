export const runtime = "nodejs"; 

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// Ajuste conforme sua política (auth check)
// Por exemplo, use next-auth/getToken aqui para validar:
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
    try {
        // opcional: autenticação
        const token = await getToken({ req: request as any, secret: process.env.AUTH_SECRET });
        if (!token) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (!file)
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );

        // validações
        const maxSize = 5 * 1024 * 1024; // 5MB por exemplo
        // @ts-ignore - File has size in the runtime
        if (
            typeof (file as any).size === "number" &&
            (file as any).size > maxSize
        ) {
            return NextResponse.json(
                { error: "File too large" },
                { status: 413 }
            );
        }

        // Normalizar nome/gerar id para armazenamento
        const originalName = (file as any).name ?? `upload-${Date.now()}`;
        const ext = originalName.includes(".")
            ? originalName.split(".").pop()
            : "bin";
        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}.${ext}`;
        const path = `images/${fileName}`;

        // obter conteúdo: ArrayBuffer -> Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Usar @vercel/blob.put (usa VERCEL_BLOB_TOKEN do env no servidor)
        const { url } = await put(path, buffer, {
            access: "public",
            // opcional: contentType
            // contentType: (file as any).type || undefined,
        });

        return NextResponse.json({ url }, { status: 200 });
    } catch (err) {
        console.error("upload error", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
