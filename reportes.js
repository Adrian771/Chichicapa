import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Verificar si el usuario está autenticado
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Usuario autenticado, proceder a cargar los reportes
        await cargarReportes();
    } else {
        // Usuario no autenticado, redirigir o mostrar un mensaje
        alert("Debes estar autenticado para ver los reportes.");
        window.location.href = 'logAutoridad.html'; // Redirigir a la página de inicio de sesión
    }
});

// Función para cargar los reportes
async function cargarReportes() {
    const reportesBody = document.getElementById('reportesBody');

    try {
        const querySnapshot = await getDocs(collection(db, 'deslaves'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');

            // Formatear el timestamp para mostrarlo de manera legible
            const timestamp = new Date(data.timestamp.toDate()).toLocaleString();

            row.innerHTML = `
                <td>${data.description}</td>
                <td><img src="${data.imageUrl}" alt="Imagen del Deslave" width="100"></td>
                <td>${data.coordinates.lat}, ${data.coordinates.lng}</td>
                <td>${timestamp}</td> <!-- Nueva celda para el timestamp -->
                <td><button class="resueltoButton" data-id="${doc.id}">Resuelto</button></td>
            `;

            reportesBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar reportes:", error);
    }
}
