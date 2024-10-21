import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCeMAAiVchEmkAqdRqFTSJSh4CmfOLUPHg",
    authDomain: "chichicapa-930cb.firebaseapp.com",
    projectId: "chichicapa-930cb",
    storageBucket: "chichicapa-930cb.appspot.com",
    messagingSenderId: "1042962898203",
    appId: "1:1042962898203:web:c50fd58eaa78ae1f4547be",
    measurementId: "G-8Y1JCPZVJW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const loginForm = document.getElementById('loginForm');
const notification = document.getElementById('notification');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario autenticado
            notification.innerText = 'Inicio de sesión exitoso';
            notification.style.display = 'block'; // Mostrar notificación
            setTimeout(() => {
                window.location.href = 'upload.html'; // Redirigir a la página de carga
            }, 2000); // Redirigir después de 2 segundos
        })
        .catch((error) => {
            console.error('Error al iniciar sesión:', error);
            notification.innerText = error.message; // Mostrar mensaje de error
            notification.style.display = 'block'; // Mostrar notificación
        });
});
