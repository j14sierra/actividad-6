import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [citas, setCitas] = useState([]);
    const [nombrePaciente, setNombrePaciente] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/citas')
            .then(response => setCitas(response.data))
            .catch(error => console.error('Error al obtener las citas:', error));
    }, []);

    const agregarCita = () => {
        axios.post('http://localhost:5000/api/citas', {
            nombre_paciente: nombrePaciente,
            fecha,
            hora
        })
        .then(() => {
            setCitas([...citas, { nombre_paciente: nombrePaciente, fecha, hora }]);
            setNombrePaciente('');
            setFecha('');
            setHora('');
        })
        .catch(error => console.error('Error al crear la cita:', error));
    };

    return (
        <div className="App">
            <h1>Gestión de Citas Médicas</h1>
            <div>
                <h2>Crear Nueva Cita</h2>
                <input
                    type="text"
                    placeholder="Nombre del Paciente"
                    value={nombrePaciente}
                    onChange={(e) => setNombrePaciente(e.target.value)}
                />
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />
                <button onClick={agregarCita}>Agregar Cita</button>
            </div>

            <h2>Lista de Citas</h2>
            <ul>
                {citas.map((cita, index) => (
                    <li key={index}>
                        {cita.nombre_paciente} - {cita.fecha} a las {cita.hora}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
