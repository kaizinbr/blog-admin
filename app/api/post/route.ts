import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";

import { auth } from "@/auth";

export async function POST(request: Request) {
    try {
        const { shorten, content, title, tags, raw, published, color, image } =
            await request.json();

        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Parece que não está autenticado" },
                { status: 401 }
            );
        }

        const post = await prisma.post.upsert({
            where: { shorten },
            update: {
                content,
                title,
                tags: {
                    connectOrCreate: tags.map((name: string) => ({
                        where: { name },
                        create: { name },
                    })),
                },
                raw,
                published,
                color,
                image,
            },
            create: {
                shorten,
                content,
                title,
                tags: {
                    connectOrCreate: tags.map((name: string) => ({
                        where: { name },
                        create: { name },
                    })),
                },
                raw,
                published,
                color,
                image,
                authorId: session.user.id,
            },
        });

        console.log("post created");

        return NextResponse.json({ post }, { status: 201 });
    } catch (err) {
        console.error("upload error", err);

        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
