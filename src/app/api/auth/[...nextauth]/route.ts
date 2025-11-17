import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        isChild: { label: 'Is Child', type: 'checkbox' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // For demo purposes - simple authentication
        // In production, use bcrypt to hash passwords
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // Create new user if doesn't exist (simplified for demo)
        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            name: credentials.name || 'User',
            role: credentials.isChild === 'true' ? 'CHILD' : 'PARENT',
          },
        });

        // Create child profile if it's a child account
        if (credentials.isChild === 'true') {
          await prisma.childProfile.create({
            data: {
              userId: newUser.id,
            },
          });
        }

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
