const { Schema, model } = require('mongoose');

const ItemsSchema = Schema({
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    details: {
        type: String
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
});

const CarritoSchema = Schema({

    items: [ItemsSchema],

    total: {
        type: Number,
        default: 0
    }

});

const ClientSchema = Schema({

    name: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
    },

    cedula: {
        type: String,
        unique: true
    },

    codearea: {
        type: String,
        default: '+57'
    },

    phone: {
        type: String
    },

    zip: {
        type: String
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String
    },

    address: {
        type: String
    },

    city: {
        type: String
    },

    department: {
        type: String
    },

    party_type: {
        type: String,
        default: 'PERSONA_NATURAL'
    },

    referralCode: {
        type: String
    },

    referredBy: {
        type: String
    },

    walletBalance: {
        type: Number,
        default: 0
    },

    status: {
        type: Boolean,
        default: true
    },

    activo: {
        type: Boolean,
        default: false
    },

    vip: {
        type: Boolean,
        default: false
    },

    wholesale: {
        type: Boolean,
        default: false
    },

    carrito: CarritoSchema,

    fecha: {
        type: Date,
        default: Date.now
    }

});

ClientSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;

});

module.exports = model('Clients', ClientSchema);