const express = require('express');
const conectarDB = require('./config/db')

// crear eL servidor
const app = express();

//conectar la base de datos
conectarDB();

//Habilitar Express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))


// arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
}); 