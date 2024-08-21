import { google } from 'googleapis'

// Call Indexing API

const credential = JSON.parse(
    Buffer.from(import.meta.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const jwtClient = new google.auth.JWT(
    credential.client_email,
    undefined,
    credential.private_key,
    ['https://www.googleapis.com/auth/indexing'],
);

export const indexUrl = async (url: string) => {
    const res = await google.indexing({
        version: 'v3',
        auth: jwtClient,
    }).urlNotifications.publish({
        requestBody: {
            url,
            type: 'URL_UPDATED'
        }
    });
    console.log(res);
    return res;
}