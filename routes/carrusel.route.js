/** =====================================================================
 *  TASKS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const expressFileUpload = require('express-fileupload');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCarruseles, createCarrusel, updateCarrusel, deleteCarrusel } = require('../controllers/carruseles.controller');

// CONTROLLERS

const router = Router();

router.use(expressFileUpload());

/** =====================================================================
 *  POST
=========================================================================*/
router.post('/query', getCarruseles);

/** =====================================================================
 *  POST CREATE
=========================================================================*/
router.post('/', [
        validarJWT,
        validarCampos
    ],
    createCarrusel
);

/** =====================================================================
 *  PUT
=========================================================================*/
router.put('/:id', validarJWT, updateCarrusel);

/** =====================================================================
 *  DELETE
=========================================================================*/
router.delete('/:id', validarJWT, deleteCarrusel);

// EXPORT
module.exports = router;