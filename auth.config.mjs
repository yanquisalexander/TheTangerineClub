import TwitchProvider from '@auth/core/providers/twitch';
import { db, eq, User } from "astro:db";
import { defineConfig } from 'auth-astro';
import { TWITCH_SCOPES } from '@/lib/twitch';


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