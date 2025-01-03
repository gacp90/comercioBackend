const { response } = require('express');

const User = require('../models/users.model');
const Client = require('../models/clients.model');
const Product = require('../models/products.model');
const Pedido = require('../models/pedidos.model');
const LogProduct = require('../models/log.products.model');

/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/
const search = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 50;
    const activo = req.query.activo || 'no';
    const web = req.query.web || 'no';

    let data = [];
    let total;

    const numeros = /^[0-9]+$/;
    let number = false;

    if (busqueda.match(numeros)) {
        number = true;
    } else {
        number = false;
    }

    switch (tabla) {

        case 'users':

            // data = await User.find({ name: regex });
            [data, total] = await Promise.all([
                User.find({
                    $or: [
                        { email: regex },
                        { name: regex },
                        { role: regex },
                        { address: regex }
                    ]
                }),
                User.countDocuments()
            ]);
            break;


        case 'clients':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Client.find({
                    $or: [
                        { name: regex },
                        { cedula: regex },
                        { phone: regex },
                        { email: regex },
                        { address: regex },
                        { city: regex },
                        { Department: regex }
                    ]
                }),
                Client.countDocuments()
            ]);
            break;
        case 'products':

            // data = await Client.find({ name: regex });
            let query = {
                $or: [
                    { sku: regex },
                    { name: regex },
                    { description: regex }
                ]
            }

            if (activo === 'si') query.inventory = { $gte: 1, $lt: 10000000 };
            if (web === 'si') query.status = true;

            [data, total] = await Promise.all([
                Product.find(query)
                .skip(desde)
                .limit(hasta)
                .populate('categoria')
                .populate('subcategoria'),
                Product.countDocuments()
            ]);

            break;

        case 'pedidos':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Pedido.find({
                    $or: [
                        { pedido: regex },
                        { amount: regex },
                        { estado: regex }
                    ]
                })
                .skip(desde)
                .limit(hasta)
                .populate('client'),
                Pedido.countDocuments()
            ]);
            break;
        case 'movimientos':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                LogProduct.find({
                    $or: [
                        { sku: regex },
                        { name: regex },
                        { description: regex },
                        { type: regex },
                        { categoria: regex },
                        { subcategoria: regex }
                    ]
                })
                .populate('cajero', 'name')
                .skip(desde)
                .limit(hasta),
                LogProduct.countDocuments()
            ]);
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/


// EXPORTS
module.exports = {
    search
};