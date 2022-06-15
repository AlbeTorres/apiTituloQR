const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

// crear eL servidor
const app = express();

//conectar la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar Express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/participantes', require('./routes/participantes'))
app.use('/api/trabajos', require('./routes/trabajos'))


// arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
}); 