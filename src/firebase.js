import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";

// import {} from ""


export default async function initFirebase() {
    // /.netlify/functions/getFirebaseConfig
    const response = await fetch("../netlify/functions/getFirebaseConfig.js");
    const {  apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId } = await response.json();

    const firebaseConfig = {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId,
    };

    // console.log(firebaseConfig);

    return getAuth(initializeApp(firebaseConfig));
}




// const app = initFirebase().then((res) => {
//     console.log(res.json());
//     return res.json();
// });
//
// export const auth = getAuth(app);
// export default initFirebase;