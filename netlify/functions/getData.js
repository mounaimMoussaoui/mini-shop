export default async (req, res) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY_FIREBASE;
    const authDomain = import.meta.env.VITE_APP_AUTH_DOMAIN_FIREBASE;
    const projectId = import.meta.env.VITE_APP_PROJECT_ID_FIREBASE;
    const storageBucket = import.meta.env.VITE_APP_STORAGE_BUCKET_FIREBASE;
    const messagingSenderId = import.meta.env.VITE_APP_MESSAGING_SENDER_ID;
    const appId = import.meta.env.VITE_APP_APP_ID;
    const measurementId = import.meta.env.VITE_APP_MEASUREMENT_ID;
    // use the secret here safely
    return new Response(JSON.stringify({ ok: true }));
};

