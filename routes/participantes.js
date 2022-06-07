// rutas participantes
const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//crear un participante
//api/participantes
router.post('/',auth,
    [ 
        check('nombre','El nombre esw obligatorio').not().isEmpty(),
        check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    
    ],
    participantesController.crearParticipante
);

module.exports= router;
