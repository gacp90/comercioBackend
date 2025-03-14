//Env
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const cron = require('node-cron');

//Conection DB
const { dbConection } = require('./database/config');
const { validateClients } = require('./middlewares/validate-user');

// Crear el servidor express
const app = express();

// CORS
app.use(cors());

//app.use(express.bodyParser({ limit: '50mb' }));
// READ BODY
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


// DataBase
dbConection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// RUTAS
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/carrusel', require('./routes/carrusel.route'));
app.use('/api/clients', require('./routes/clients.route'));
app.use('/api/asdas', require('./routes/empresa.route'));
app.use('/api/subcategory', require('./routes/subcategory.route'));
app.use('/api/pedidos', require('./routes/pedido.route'));
app.use('/api/products', require('./routes/products.route'));
app.use('/api/logproducts', require('./routes/logproducts.route'));
app.use('/api/invoices', require('./routes/invoice.route'));
app.use('/api/search', require('./routes/search.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/tasks', require('./routes/tasks.route'));
app.use('/api/uploads', require('./routes/uploads.route'));

// SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});

// A las 5:30 AM
cron.schedule('30 5 * * *', () => {
    validateClients();
});

// A las 11:15 AM
cron.schedule('15 11 * * *', () => {
    validateClients();
});

// A las 3:45 PM
cron.schedule('45 15 * * *', () => {
    validateClients();
});

// A las 7:30 PM
cron.schedule('30 19 * * *', () => {
    validateClients();
});
// A las 1:45 AM
cron.schedule('45 1 * * *', () => {
    validateClients();
});