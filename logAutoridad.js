// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCeMAAiVchEmkAqdRqFTSJSh4CmfOLUPHg",
    authDomain: "chichicapa-930cb.firebaseapp.com",
    projectId: "chichicapa-930cb",
    storageBucket: "chichicapa-930cb.appspot.com",
    messagingSenderId: "1042962898203",
    appId: "1:1042962898203:web:c50fd58eaa78ae1f4547be",
    measurementId: "G-8Y1JCPZVJW"
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Referencias de los elementos del DOM
const claveInput = document.getElementById('clave');
const loginButton = document.getElementById('loginButton');
const notification = document.getElementById('notification');

// Mapa de claves a cargos
const claves = {
    "N00l50A5": "Presidente",
    "S9591nP7": "Regidor de Gobernación",
    "6199MD8l": "Regidor de Salud",
    "381Z86iD": "Regidor de Educación",
    "4Z1U454u": "Capitán Policia"
};

// Manejar el clic en el botón de iniciar sesión
loginButton.addEventListener('click', async () => {
    const clave = claveInput.value.trim();

    // Verificar si la clave está vacía
    if (!clave) {
        notification.textContent = 'Por favor ingresa una clave.';
        notification.style.display = 'block';
        return;
    }

    try {
        // Buscar la clave en Firestore
        const docRef = doc(db, 'autoridades', 'autoridad1');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            let isAuthorized = false;

            // Verificar si la clave ingresada coincide con alguna clave en la colección
            for (const [key, value] of Object.entries(data)) {
                if (value === clave) {
                    isAuthorized = true;
                    // Almacenar el cargo correspondiente en sessionStorage
                    sessionStorage.setItem("cargoUsuario", claves[value]);
                    break;
                }
            }

            if (isAuthorized) {
                // Redirigir a autoridad.html si la clave es correcta
                window.location.href = 'autoridad.html';
            } else {
                notification.textContent = 'Clave incorrecta. Intenta nuevamente.';
                notification.style.display = 'block';
            }
        } else {
            notification.textContent = 'No se encontraron datos de autoridades.';
            notification.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        notification.textContent = 'Ocurrió un error. Intenta nuevamente más tarde.';
        notification.style.display = 'block';
    }
});
