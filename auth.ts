// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/mongoClientPromise"; // MongoDB client
// import type { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & {
//       id: string;
//     };
//   }
// }

// const clientId = process.env.GOOGLE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// if (!clientId || !clientSecret) {
//   throw new Error(
//     "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment"
//   );
// }

// const handler = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),

//   providers: [
//     GoogleProvider({
//       clientId,
//       clientSecret,
//     }),
//   ],

//   callbacks: {
//     // 🔹 Remove Prisma creation; only handle session & JWT
//     async session({ session }) {
//       // Optionally, you can keep user id if needed from MongoDB user
//       return session;
//     },

//     async jwt({ token, user }) {
//       if (user?.id) token.id = user.id;
//       return token;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//   },

//   debug: process.env.NODE_ENV === "development",
// });

// export { handler as GET, handler as POST };
