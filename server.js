const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/disasterManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir o modelo de Alerta
const Alert = mongoose.model('Alert', new mongoose.Schema({
    type: String,
    description: String,
    date: { type: Date, default: Date.now }
}));

// Rota para obter todos os alertas
app.get('/alerts', async (req, res) => {
    const alerts = await Alert.find();
    res.send(alerts);
});

// Rota para criar um novo alerta
app.post('/alerts', async (req, res) => {
    const alert = new Alert({
        type: req.body.type,
        description: req.body.description
    });
    await alert.save();
    res.send(alert);
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
