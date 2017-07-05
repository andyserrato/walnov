var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');

//Modelos
var MensajePrivado = require('mongoose').model('mensajePrivado');
var Usuario = require('mongoose').model('usuarios');
var Utils = require("../services/utils.service").Utils;

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.post('/nuevoMensajePrivado', nuevoMensajePrivado);

module.exports = router;

function authenticate(req, res) {
    console.log("Atendiendo petición");
    userService.authenticate(req.body.username, req.body.password)
        .then(function(user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function nuevoMensajePrivado(req, res){
    let nuevoMensajePrivado = _crearNuevoMensajePrivado(req.body);

    Usuario.findOneAndUpdate({_id: req.body.destinatario},{$push: {mensajesPrivados: nuevoMensajePrivado}}, function(err, usuario){
        _devolverResultados(err, {resultado:"OK"}, res);
    });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _crearNuevoMensajePrivado(params){
    let fechaHora = new Date();

    let nuevoMensajePrivado = new MensajePrivado({
        fecha: Utils.getFecha(fechaHora),
        hora: Utils.getHora(fechaHora),
        timestamp: fechaHora,
        leido: false,
        destinatario: params.destinatario,
        destinatarioName: params.destinatarioName,
        mensaje: params.mensaje,
        remitenteName: params.remitenteName,
        remitente: params.remitente
    });

    return nuevoMensajePrivado;
}

function _devolverResultados(err, item, resp){

    if (err){
        resp.send("ERROR");
    }else{
        resp.send(item);
    }
}
