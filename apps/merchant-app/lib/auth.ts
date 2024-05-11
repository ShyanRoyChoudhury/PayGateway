import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db";
import { AuthOptions, User, Account, Profile } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || ("" as string),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ("" as string),
    }),
  ],
  callbacks: {
    //   async signIn({ user, account }: {
    //     user: {
    //       email: string | undefined;
    //       name: string | undefined
    //     },
    //     account: {
    //       provider: "google" | "github"
    //     }
    //   }) {
    //     if (!user || !user.email) {
    //       return false;
    //     }

    //     await db.merchant.upsert({
    //       select: {
    //         id: true
    //       },
    //       where: {
    //         email: user.email
    //       },
    //       create: {
    //         email: user.email,
    //         name: user.name,
    //         auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
    //       },
    //       update: {
    //         name: user.name,
    //         auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
    //       }
    //     });

    //     return true;
    //   }
    // },
    async signIn(params: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
    }): Promise<boolean> {
      const { user, account } = params;

      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account?.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
        update: {
          name: user.name,
          auth_type: account?.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
      });

      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "secret",
};
