import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import jwt from "jsonwebtoken"

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: user } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // ✅ upsert AND select the Supabase UUID in one call
        const { data } = await supabaseAdmin
          .from("users")
          .upsert(
            { name: user.name, email: user.email, image: user.image },
            { onConflict: "email" }
          )
          .select("id")
          .single()

        if (data) {
          user.id = data.id // ✅ Supabase UUID, not Google's ID
        }
      }

      if (account?.provider === "credentials") {
        const { data } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", user.email!)
          .single()

        if (data) {
          user.id = data.id
        }
      }

      return true
    },

    async jwt({ token, user }) {
      // user is only present on first sign-in
      if (user?.id) {
        token.id = user.id
      }

      // Fallback: look up by email if id still missing
      if (!token.id && token.email) {
        const { data } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", token.email)
          .single()
        if (data) token.id = data.id
      }

      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string

        const signingSecret = process.env.SUPABASE_JWT_SECRET
        if (signingSecret) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: token.id as string,
            email: session.user.email,
            role: "authenticated",
          }
          session.accessToken = jwt.sign(payload, signingSecret)
        }
      }
      return session
    },
  },
})