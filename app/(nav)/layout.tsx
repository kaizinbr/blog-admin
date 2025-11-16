import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";


export const metadata: Metadata = {
    title: "Grafite - blog",
    description:
        "This is an example site to demonstrate how to use NextAuth.js for authentication",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <>

            <Header/>
            <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
                {children}
            </main>
        </>
    );
}
