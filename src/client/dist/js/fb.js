// firebase.js
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOMGJHwka81rAZFhfop5Ms7siOH47ASiE",
    authDomain: "nutri-66ee7.firebaseapp.com",
    projectId: "nutri-66ee7",
    appId: "1:526914653135:web:1d38c21c8e3974f7df20ba"
};

// Garante que só inicializa uma vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
