export default async () => {
    const apiKey = process.env.VITE_APP_API_KEY_FIREBASE;
    const authDomain = process.env.VITE_APP_AUTH_DOMAIN_FIREBASE;
    const projectId = process.env.VITE_APP_PROJECT_ID_FIREBASE;
    const storageBucket = process.env.VITE_APP_STORAGE_BUCKET_FIREBASE;
    const messagingSenderId = process.env.VITE_APP_MESSAGING_SENDER_ID;
    const appId = process.env.VITE_APP_APP_ID;
    const measurementId = process.env.VITE_APP_MEASUREMENT_ID;


    return new Response(JSON.stringify({
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId,
    }), {
        headers: { "Content-Type": "application/json" }
    });
};

