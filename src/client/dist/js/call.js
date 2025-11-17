import { auth } from "./fb.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";



async function authReady() {
    return new Promise(resolve => {
        const stop = onAuthStateChanged(auth, user => {
            stop();
            resolve(user);
        });
    });
}

export async function apiRequest(url, options = {}) {
    const user = await authReady();

    let token = null;

    //console.log(user);
    if (user) {
        token = await user.getIdToken(); // token sempre atualizado
    }

    options.headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Erro na requisição:", err);
        return null;
    }
}
