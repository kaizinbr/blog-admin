import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import Resend from "next-auth/providers/resend";
//
import Apple from "next-auth/providers/apple";
// import Atlassian from "next-auth/providers/atlassian"
import Auth0 from "next-auth/providers/auth0";
import AzureB2C from "next-auth/providers/azure-ad-b2c";
import BankIDNorway from "next-auth/providers/bankid-no";
import BoxyHQSAML from "next-auth/providers/boxyhq-saml";
import Cognito from "next-auth/providers/cognito";
import Coinbase from "next-auth/providers/coinbase";
import Discord from "next-auth/providers/discord";
import Dropbox from "next-auth/providers/dropbox";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Google from "next-auth/providers/google";
import Hubspot from "next-auth/providers/hubspot";
import Keycloak from "next-auth/providers/keycloak";
import LinkedIn from "next-auth/providers/linkedin";
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id";
import Netlify from "next-auth/providers/netlify";
import Okta from "next-auth/providers/okta";
import Passage from "next-auth/providers/passage";
import Passkey from "next-auth/providers/passkey";
import Pinterest from "next-auth/providers/pinterest";
import Reddit from "next-auth/providers/reddit";
import Slack from "next-auth/providers/slack";
import Salesforce from "next-auth/providers/salesforce";
import Spotify from "next-auth/providers/spotify";
import Twitch from "next-auth/providers/twitch";
import Twitter from "next-auth/providers/twitter";
import Vipps from "next-auth/providers/vipps";
import WorkOS from "next-auth/providers/workos";
import Zoom from "next-auth/providers/zoom";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import vercelKVDriver from "unstorage/drivers/vercel-kv";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

// neon
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";

import { PrismaAdapter } from "@auth/prisma-adapter";

// const storage = createStorage({
//     driver: process.env.VERCEL
//         ? vercelKVDriver({
//               url: process.env.AUTH_KV_REST_API_URL,
//               token: process.env.AUTH_KV_REST_API_TOKEN,
//               env: false,
//           })
//         : memoryDriver(),
// });

type Credentials = {
    email: string;
    name?: string;
    password: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCredentials(raw: any): Credentials {
    if (typeof raw?.email === "string" && typeof raw?.password === "string") {
        return {
            email: raw.email,
            name: typeof raw.name === "string" ? raw.name : undefined,
            password: raw.password,
        };
    }
    throw new Error("Credenciais inválidas");
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    return {
        debug: !!process.env.AUTH_DEBUG,
        theme: { logo: "https://authjs.dev/img/logo-sm.png" },
        adapter: PrismaAdapter(prisma),
        providers: [
            // github,

            Resend({
                from: "noreply@kaizin.com.br",
            }),
            CredentialsProvider({
                name: "credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    name: { label: "Name", type: "name" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials) {
                    const creds = parseCredentials(credentials);
                    if (!creds?.email || !creds?.password) return null;

                    const user = await prisma.user.findUnique({
                        where: { email: creds.email },
                    });

                    if (!user) {
                        const tempUsername = `user_${Math.random()
                            .toString(36)
                            .slice(2, 10)}`;
                        const newUser = await prisma.user.create({
                            data: {
                                name: creds.name ?? creds.email,
                                email: creds.email,
                                password: await bcrypt.hash(creds.password, 10),
                                Profile: {
                                    create: {
                                        username: tempUsername,
                                        lowername: tempUsername.toLowerCase(),
                                        name: creds.name ?? creds.email,
                                        bio: "",
                                        avatarUrl: "",
                                    },
                                },
                            },
                        });

                        return {
                            id: newUser.id,
                            email: newUser.email,
                            name: newUser.name,
                        };
                    }

                    if (!user.password) {
                        throw new Error("Invalid credentials 1");
                    }
                    const isCorrectPassword = await bcrypt.compare(
                        creds.password,
                        user.password
                    );

                    if (!isCorrectPassword) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                },
            }),
        ],
        pages: {
            signIn: "/login",
            newUser: "/new-user",
        },
        session: { strategy: "jwt" },

        secret: process.env.AUTH_SECRET,
        callbacks: {
            authorized({ request, auth }) {
                const { pathname } = request.nextUrl;
                if (pathname === "/middleware-example") return !!auth;
                return true;
            },
            jwt({ token, trigger, session, account, user }) {
                if (user && (user as any).id) token.id = (user as any).id;

                if (trigger === "update") token.name = session.user.name;
                if (account?.provider === "keycloak") {
                    return { ...token, accessToken: account.access_token };
                }

                return token;
            },
            async session({ session, token }) {
                if (token?.accessToken) session.accessToken = token.accessToken;

                const userId = (token as any).id ?? (token as any).sub;
                if (userId) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (session.user as any).id = userId as string;
                }

                return session;
            },
        },
        experimental: { enableWebAuthn: true },
    };
});

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        // ensure session.user has an optional id
        user?: {
            id?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        id?: string;
    }
}
