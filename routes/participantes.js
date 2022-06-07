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

//obtener todos los participantes
router.get('/',auth,
    participantesController.obtenerParticipantes
    );

//modificar un participante
router.patch('/:id',auth,
    participantesController.modificarParticipante
    );

//eliminar un participante
router.delete('/:id',auth,
    participantesController.eliminarParticipante
    );


module.exports= router;
