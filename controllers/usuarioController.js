const Usuario = require('../models/Usuario');

exports.crearUsuario= async(req,res)=>{
    
    try{

        let usuario;

        //crea el usuario

        usuario =new Usuario(req.body);

        //guardar usuario
        await usuario.save();

        //mensaje de respuesta good
        res.send('Usuario creado correctamente');

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un Error')
    }

    
    
}