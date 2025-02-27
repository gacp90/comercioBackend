const { Schema, model } = require('mongoose');

const CarruselSchema = Schema({
    img: {
        type: String
    },
    
    titulo: {
        type: String
    },
    
    parrafo: {
        type: String
    },
    
    parrafotow: {
        type: String
    },
    background: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        defaul: Date.now
    }
    
});

CarruselSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.carid = _id;
    return object;

});

module.exports = model('Carruseles', CarruselSchema);