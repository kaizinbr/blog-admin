import "./globals.css";
import '@mantine/core/styles.css';
import 'tiptap-extension-resizable-image/styles.css'; //tiptap resizable image styles
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";


import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Grafite - blog",
    description:
        "This is an example site to demonstrate how to use NextAuth.js for authentication",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="pt-br"  {...mantineHtmlProps}>
            <head>
        <ColorSchemeScript />
      </head>
            <body className={inter.className}>
                <MantineProvider>
                    <div className="flex h-full min-h-screen w-full flex-col justify-between">
                        <Header />
                        <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
                            {children}
                        </main>
                    </div>
                </MantineProvider>
            </body>
        </html>
    );
}
