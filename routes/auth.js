//rutas autenticación

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController')

//Autenticar un usuario
//api/autenticar
router.post('/',
    [
        check('email','Agrega un email válido').isEmail(),
        check('password', 'El password mínimo es de 6 caracteres').isLength({min:6})

    ],
    authController.autenticarUsuario
);

module.exports= router;