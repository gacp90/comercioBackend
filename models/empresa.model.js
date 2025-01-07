const { Schema, model } = require('mongoose');

const GpsSchema = Schema({
    lat: {
        type: String
    },
    long: {
        type: String
    }
});

const NivelSchema = Schema({
    activo: {
        type: Boolean,
        defaul: false
    },
    porcentaje: {
        type: Number,
        defaul: 0
    }
});

const footer = Schema({
    background: {
        type: String,
        defaul: '#2d2d2d'
    },
    color: {
        type: String,
        defaul: '#ffffff'
    }
});

const header = Schema({
    background: {
        type: String,
        defaul: '#ffffff'
    },
    color: {
        type: String,
        defaul: '#000000'
    }
});

const EmpresasSchema = Schema({

    name: {
        type: String,
        require: true,
    },

    logo: {
        type: String
    },

    logob: {
        type: String
    },

    address: {
        type: String
    },

    nit: {
        type: String
    },

    email: {
        type: String
    },

    codephone: {
        type: String
    },

    phone: {
        type: String
    },

    facebook: {
        type: String,
        default: 'none'
    },

    instagram: {
        type: String,
        default: 'none'
    },

    tiktok: {
        type: String,
        default: 'none'
    },

    whatsapp: {
        type: String,
        default: 'none'
    },

    ico: {
        type: String
    },
    
    sizeico: {
        type: String,
        default: '150'
    },

    descripcion: {
        type: String
    },

    keywords: {
        type: String
    },
    
    gps: GpsSchema,

    marketing: {
        type: Boolean,
        default: false
    },
        
    nivelone: NivelSchema,

    niveltow: NivelSchema,

    nivelthree: NivelSchema,

    nivelfour: NivelSchema,

    header: header,

    footer: footer,

    status: {
        type: Boolean,
        default: true
    },

    fecha: {
        type: Date,
        default: Date.now
    },

});

EmpresasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.eid = _id;
    return object;

});

module.exports = model('Empresas', EmpresasSchema);