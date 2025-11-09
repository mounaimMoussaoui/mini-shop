// netlify/functions/getSecret.js
export async function handler() {
    return {
        statusCode: 200,
        body: JSON.stringify({ key: process.env.REAL_SECRET_KEY }),
    };
}
