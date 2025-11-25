// auth.ts (বা যেখানে আপনার NextAuth কনফিগারেশন আছে)

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongoClientPromise"; // আপনার mongoClientPromise

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment"
  );
}

const handler = NextAuth({
  // 💡 সমাধান: databaseName প্যারামিটারটি সরিয়ে ফেলুন
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
