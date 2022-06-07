const Participante = require('../models/Participante');
const { validationResult} = require('express-validator');



//crear un participante
exports.crearParticipante= async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear un nuevo participante

        const participante= new Participante(req.body);
        participante.creador = req.usuario.id;
        await participante.save();
        res.status(200).json(participante);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}