const Usuario = require('../models/Usuario');

exports.crearUsuario= async(req,res)=>{

    const {email, password} = req.body
    
    try{

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //crea el usuario

        usuario =new Usuario(req.body);

        //guardar usuario
        await usuario.save();

        //mensaje de respuesta good
        res.status(200).json({msg:'Usuario creado correctamente'});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un Error'});
    }

    
    
}