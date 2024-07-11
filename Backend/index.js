const express = require('express');
const cors = require('cors');
const mongoose = require('./database');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Cargamos el modulo de direccionamiento de rutas

app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/perfil', require('./routes/perfil.router'));
app.use('/api/curso', require('./routes/curso.router'));  // Agregamos esta línea

// Configuración del puerto
app.set('port', process.env.PORT || 3000);

// Iniciando el servidor
app.listen(app.get('port'), () => {
  console.log(`Server iniciado en el puerto`, app.get('port'));
});
