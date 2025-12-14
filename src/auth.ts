import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import GitHub from 'next-auth/providers/github'
import GitLab from 'next-auth/providers/gitlab'

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [GitHub, GitLab, Discord],
})
