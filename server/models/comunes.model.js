const mongoose = require('mongoose');
const Constantes = require("../constantes/constantes");
module.exports = exports = function datosYAccionesComunes(schema, options) {
  schema.add({fechaCreacion: {type: Date, default: Date.now}});
  schema.add({fechaModificacion: {type: Date, default: Date.now}});
  schema.add({activo: {type: Boolean, default: true}});
  schema.pre('save', function (next) {
    this.fechaModificacion = Date.now();
    next();
  });
};
