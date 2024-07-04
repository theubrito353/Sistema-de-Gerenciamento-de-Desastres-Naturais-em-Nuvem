import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [alerts, setAlerts] = useState([]);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        const response = await axios.get('http://localhost:5000/alerts');
        setAlerts(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAlert = { type, description };
        await axios.post('http://localhost:5000/alerts', newAlert);
        fetchAlerts();
        setType('');
        setDescription('');
    };

    return (
        <div className="App">
            <h1>Alertas de Desastres Naturais</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tipo:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Criar Alerta</button>
            </form>
            <h2>Alertas Atuais</h2>
            <ul>
                {alerts.map((alert) => (
                    <li key={alert._id}>
                        <strong>{alert.type}</strong>: {alert.description} (Data: {new Date(alert.date).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
