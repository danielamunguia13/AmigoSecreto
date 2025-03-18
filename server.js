const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Para procesar datos del formulario

// Lista para almacenar los nombres de los amigos
let amigos = [];

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para agregar un nombre
app.post('/agregar', (req, res) => {
    const nombre = req.body.nombre;
    if (nombre) {
        amigos.push(nombre);
        res.json({ success: true, amigos: amigos });
    } else {
        res.json({ success: false, message: 'Por favor, ingresa un nombre válido.' });
    }
});

// Ruta para sortear un amigo secreto
app.post('/sortear', (req, res) => {
    if (amigos.length > 0) {
        const amigoSecreto = amigos[Math.floor(Math.random() * amigos.length)];
        res.json({ success: true, amigo_secreto: amigoSecreto });
    } else {
        res.json({ success: false, message: 'No hay amigos en la lista para sortear.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});