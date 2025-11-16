import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/auth";

export default async function UserProfile() {
    const session = await auth();

    if (!session?.user) return null;
    console.log("session user", session.user.id);

    const user = await prisma.profile.findUnique({
        where: { id: session.user.id },
        include: { user: true },
    });

    // const userLists = await axios.get

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">
                {user ? user.user.name || user.user.email : "User not found"}
            </h1>
            <p className="text-gray-600">{user?.bio || "No bio available"}</p>
            <Link
                href={`/profile`}
                className="text-blue-500 hover:underline"
            >
                Edit Profile
            </Link>
        </div>
    );
}
