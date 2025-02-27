const { response } = require('express');

const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const ObjectId = require('mongoose').Types.ObjectId;

const Carrusel = require('../models/carrusel.model');

/** ======================================================================
 *  GET QUERY
=========================================================================*/
const getCarruseles = async(req, res) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [carruseles, total] = await Promise.all([
            Carrusel.find(query)
            .sort(sort)
            .limit(hasta)
            .skip(desde),
            Carrusel.countDocuments(query)
        ]);

        res.json({
            ok: true,
            carruseles,
            total
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
const createCarrusel = async(req, res = response) => {


    try {

        let datos = JSON.parse(req.body.datos);
        const carrusel = new Carrusel(datos);

        // VALIDATE IMAGE
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No has seleccionado ningún archivo'
            });
        }

        // PROCESS IMAGE
        const file = await sharp(req.files.image.data).metadata();

        // const nameShort = file.format.split('.');
        const extFile = file.format;

        // VALID EXT
        const validExt = ['jpg', 'png', 'jpeg', 'webp', 'bmp', 'svg'];
        if (!validExt.includes(extFile)) {
            return res.status(400).json({
                ok: false,
                msg: 'No se permite este tipo de imagen, solo extenciones JPG - PNG - WEBP - SVG'
            });
        }
        // VALID EXT

        // GENERATE NAME UID
        const nameFile = `${ uuidv4() }.webp`;

        // PATH IMAGE
        const path = `./uploads/carrusel/${ nameFile }`;

        // Procesar la imagen con sharp (por ejemplo, redimensionar)
        await sharp(req.files.image.data)
            .webp({ equality: 75, effort: 6 })
            .toFile(path, async(err, info) => {

                // SAVE
                carrusel.img = nameFile;
                await carrusel.save();

                carrusel.carid = carrusel._id;

                res.json({
                    ok: true,
                    carrusel
                });

            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};

/** =====================================================================
 *  UPDATE
=========================================================================*/
const updateCarrusel = async(req, res = response) => {

    const carid = req.params.id;

    try {

        // SEARCH
        const carruselDB = await Carrusel.findById(carid);
        if (!carruselDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun carrusel con este ID'
            });
        }

        // VALIDATE
        let {...campos } = req.body;

        // UPDATE
        const carruselUpdate = await Carrusel.findByIdAndUpdate(carid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            carrusel: carruselUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};

/** =====================================================================
 *  DELET
=========================================================================*/
const deleteCarrusel = async(req, res = response) => {

    try {

        const carid = req.params.id;

        const carruselDB = await Carrusel.findById(carid);
        if (!carruselDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun carrusel con este ID'
            });
        }

        await Carrusel.findByIdAndDelete(carid);

        res.json({
            ok: true,
            msg: 'Se ha eliminado el carrusel exitosamente!'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};

// EXPORTS
module.exports = {
    getCarruseles,
    createCarrusel,
    updateCarrusel,
    deleteCarrusel
};