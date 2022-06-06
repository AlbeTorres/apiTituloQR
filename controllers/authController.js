const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body

    try {

        //comprobar que existe un usuario registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg:'No exixte un usuario registrado con ese email'});
        }

        //comprobar que el password es correcto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'La contraseña no es correcta'})
        }


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
        console.log(erro)
        
    }
    
}