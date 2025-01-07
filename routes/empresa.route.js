/** =====================================================================
 *  EMPRESA ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { getEmpresa, createEmpresa, updateEmpresa } = require('../controllers/empresas.controller');

const router = Router();

/** =====================================================================
 *  GET
=========================================================================*/
router.get('/', getEmpresa);

/** =====================================================================
 *  POST CREATE
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        validarCampos
    ],
    createEmpresa
);

/** =====================================================================
 *  PUT CATEGORY
=========================================================================*/
router.put('/:id', validarJWT, updateEmpresa);

// EXPORT
module.exports = router;