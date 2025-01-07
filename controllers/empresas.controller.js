const { response } = require('express');

const Empresa = require('../models/empresa.model');

/** =====================================================================
 *  GET
=========================================================================*/
const getEmpresa = async(req, res = response) => {

    try {

        const empresa = await Empresa.findOne({status: true});

        res.json({
            ok: true,
            empresa
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  CREATE
=========================================================================*/
const createEmpresa = async(req, res = response) => {

    try {

        const empresaDB = await find();
        if (empresaDB.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se guardo un registro de empresa...'
            });
        }

        const empresa = new Empresa(req.body);
        if (empresa.email) {
            empresa.email = empresa.email.trim().toLowerCase();
        }
        await empresa.save();

        res.json({
            ok: true,
            empresa
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  UPDATE
=========================================================================*/
const updateEmpresa = async(req, res = response) => {

    try {

        const eid = req.params.id;
        const {...empresa} = req.body;

        const empresaDB = await Empresa.findById(eid);
        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun registro con este ID'
            });
        }
        
        if (empresa.email) {
            empresa.email = empresa.email.trim().toLowerCase();
        }

        // UPDATE
        const empresaUpdate = await Empresa.findByIdAndUpdate(eid, empresa, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            empresa: empresaUpdate
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

// EXPORTS
module.exports = {
    getEmpresa,
    createEmpresa,
    updateEmpresa
}