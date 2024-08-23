import TwitchProvider from '@auth/core/providers/twitch';
import { db, eq, User } from "astro:db";
import { defineConfig } from 'auth-astro';
import { getSubscriptionTier, TWITCH_SCOPES } from '@/lib/twitch';
import { createOrUpdateUser } from "@/utils/users";


export default defineConfig({
    providers: [
        TwitchProvider({
            clientId: import.meta.env.TWITCH_CLIENT_ID,
            clientSecret: import.meta.env.TWITCH_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: TWITCH_SCOPES.join(' '),
                    force_verify: true,
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user, account, profile }) => {
            if (user) {
                token.user = profile
                console.log({ user, account, profile });
                try {
                    const tier = await getSubscriptionTier(profile.sub, account.access_token);
                    await createOrUpdateUser({
                        id: profile.sub,
                        username: user.name.toLowerCase(),
                        displayName: profile.preferred_username,
                        twitchTier: tier,
                    })

                } catch (error) {
                    console.error(error);
                }
            }
            return Promise.resolve(token);
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.user.sub,
                }
            }
        },
    }
});