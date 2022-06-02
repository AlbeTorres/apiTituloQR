const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario= async(req,res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body
    
    try{

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //crea el usuario

        usuario =new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        //guardar usuario
        await usuario.save();

        //crear y firmar jwt
        const payload ={
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000

        },(error, token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.status(200).json({token});


        });

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un Error'});
    }

    
    
}