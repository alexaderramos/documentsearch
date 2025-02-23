const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const sequelize = require('./config/database');
const residentRoutes = require('./routes/residentRoutes');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
// Routes
app.use('/api/residents', residentRoutes);

// Database sync and server start
async function startServer() {
    try {
        await sequelize.sync();
        console.log('Base de datos sincronizada correctamente');
        
        app.listen(config.port, () => {
            console.log(`Servidor corriendo en puerto ${config.port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer(); 