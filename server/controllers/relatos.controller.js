var express = require('express');
var router = express.Router();

//Modelos
var Relato = require('mongoose').model('relato');
var OpinionRelato = require('mongoose').model('opinionRelato');

//Constantes y Factorias
var GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
var Constantes = require("../constantes/constantes");

router.post("/", crearNuevoRelato);
router.post("/opinion", crearNuevaOpinion);
router.post("/responderOpinion", responderOpinion);
router.get("/:idRelato", getRelatoById);
router.post("/lista", obtenerRelatos);
router.delete("/", borrarRelato);

module.exports = router;

function crearNuevoRelato(req, resp){
    let peticion = req.body;
    let nuevoRelato = new Relato(peticion.relato);

    nuevoRelato.save(function (err, nuevoRelato){
        let notificacionNuevoRelato = GestorNotificaciones.crearNotificacionNuevoRelato(nuevoRelato.textoContenido, null, nuevoRelato.autor, nuevoRelato.autorNombre, nuevoRelato._id, nuevoRelato.tituloRelato);
        GestorNotificaciones.addNotificacionFeed(notificacionNuevoRelato, peticion.seguidores);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

function getRelatoById(req, resp){
    Relato.findById(req.params.idRelato, function(err, relato){
        _devolverResultados(err, relato, resp);
    });
}

function obtenerRelatos(req, resp){
    let peticion = req.body;
    let i = (peticion.pagina - 1) * 20;

    Relato.find(_getFiltrosQuery(peticion.opciones, peticion.siguiendo),{},{skip: i, limit:20, sort:_obtenerCriteriosOrdenacion(peticion.opciones)}, function(err, relatos){
        _devolverResultados(err, relatos, resp);
    });
}

function borrarRelato(req, resp){
    let peticion = req.body;

    Relato.remove({_id: peticion.idRelato}, function(err){
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

function responderOpinion(req, resp){
    let update = {};
    let peticion = req.body;
    let respuesta = new OpinionRelato(peticion.respuesta);
    update["opiniones." + peticion.indiceOpinion + ".respuesta"] = respuesta;

    Relato.findOneAndUpdate({_id : req.body.idRelato}, {$set:update}, function(err, response){
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

function crearNuevaOpinion(req, resp){
    let peticion = req.body;
    let nuevaOpinionRelato = new OpinionRelato(peticion.nuevaOpinion);

    Relato.findOneAndUpdate({_id : peticion.idRelato}, {$push:{opiniones: nuevaOpinionRelato}}, function(err, relato){
        let nuevaNotificacionOpinionRelato = GestorNotificaciones.crearNotificacionNuevaOpinionRelato(nuevaOpinionRelato.textoContenido, new Date(), nuevaOpinionRelato.autor, nuevaOpinionRelato.autorNombre, relato._id, relato.tituloRelato);
        GestorNotificaciones.addNotificacionFeed(nuevaNotificacionOpinionRelato, peticion.seguidores);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

function _getFiltrosQuery(opciones, siguiendo){
    let filtros = {};

    //Filtro por gente a la que sigue el usuario o todo el mundo
    if (opciones.siguiendo == true){
        //De los usuarios a los que esta siguiiendo el usuario
        filtros = {autor:{$in: siguiendo}};
    }

    //Filtro por categoria
    if (opciones.hasOwnProperty("categoria")){
        filtros.categoria = opciones.categoria;
    }

    //Filtro por tags
    if (opciones.hasOwnProperty("tags")){
        filtros.tags = {$in:opciones.tags}
    }

    return filtros;
}

function _obtenerCriteriosOrdenacion(opciones){
    let ordenacion = {};

    if (opciones.hasOwnProperty("likes")){
        ordenacion = {likes: -1};
    }else if (opciones.hasOwnProperty("vecesVisto")){
        ordenacion = {vecesVisto: -1};
    }else if (opciones.hasOwnProperty("compartidoFacebook")){
        ordenacion = {compartidoFacebook: -1};
    }else if (opciones.hasOwnProperty("compartidoTwitter")){
        ordenacion = {compartidoTwitter: -1};
    }else if (opciones.hasOwnProperty("compartidoGoogle")){
        ordenacion = {compartidoGoogle: -1};
    }

    return ordenacion;
}

function _devolverResultados(err, item, resp){

    if (err){
        resp.send("ERROR");
    }else{
        resp.send(item);
    }
}
