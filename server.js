const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña',
    database: 'gestion_citas'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las citas
app.get('/api/citas', (req, res) => {
    db.query('SELECT * FROM citas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las citas.' });
        }
        res.json(results);
    });
});

// Ruta para crear una nueva cita
app.post('/api/citas', (req, res) => {
    const { nombre_paciente, fecha, hora } = req.body;
    db.query('INSERT INTO citas (nombre_paciente, fecha, hora) VALUES (?, ?, ?)', [nombre_paciente, fecha, hora], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear la cita.' });
        }
        res.status(201).json({ message: 'Cita creada exitosamente.' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
