import "./globals.css";
import '@mantine/core/styles.css';
import 'tiptap-extension-resizable-image/styles.css'; //tiptap resizable image styles
import type { Metadata } from "next";
import { Inter, EB_Garamond, Newsreader } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";


import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });
const eb_garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "700", "800"] });
const newsreader = Newsreader({ subsets: ["latin"] });

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
            <body className={inter.className + " " + eb_garamond.className + " " + newsreader.className}>
                <MantineProvider>
                    <div className="flex h-full min-h-screen w-full flex-col justify-between">
                            {children}
                    </div>
                </MantineProvider>
            </body>
        </html>
    );
}
