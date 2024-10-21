import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
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
const registerForm = document.getElementById('registerForm');
const notification = document.getElementById('notification');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario registrado
            notification.innerText = 'Usuario registrado con éxito';
            notification.style.display = 'block'; // Mostrar notificación
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
            }, 2000); // Redirigir después de 2 segundos
        })
        .catch((error) => {
            console.error('Error al registrar:', error);
            notification.innerText = error.message; // Mostrar mensaje de error
            notification.style.display = 'block'; // Mostrar notificación
        });
});
