import { ApiClient } from '@twurple/api';
import { StaticAuthProvider, AppTokenAuthProvider } from '@twurple/auth';

export const TWITCH_SCOPES = [
    'openid',
    'user:read:email',
    'user:read:subscriptions'
]

type SubscriptionTier = null | 1 | 2 | 3

export const TTC_BROADCASTER_ID = 49753916

export const getSubscriptionTier = async (userId: string, accessToken: string): Promise<SubscriptionTier> => {
    try {
        const authProvider = new StaticAuthProvider(import.meta.env.TWITCH_CLIENT_ID, accessToken)
        const apiClient = new ApiClient({ authProvider })

        const subInfo = await apiClient.subscriptions.checkUserSubscription(userId, TTC_BROADCASTER_ID)

        if (!subInfo) return null

        return subInfo.tier.charAt(0) as unknown as 1 | 2 | 3
    } catch (error) {
        console.error(error)
        return null
    }
}
