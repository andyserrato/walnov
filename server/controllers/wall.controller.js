
var express = require('express');
var router = express.Router();

//Modelos
var Wall = require('mongoose').model('wall');
var Historia = require('mongoose').model('historia');
var InicioHistoria = require('mongoose').model('item');
var ContinuacionHistoria = require('mongoose').model('item');
var Usuario = require('mongoose').model('usuarios');
var NotificacionFeed = require('mongoose').model('notificacionFeed');
var NotificacionNuevoWall = require('mongoose').model('notificacionNuevoWall');
//Constantes y Factorias
var GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
var Constantes = require("../constantes/constantes");
var Utils = require("../services/utils.service").Utils;

//RUTAS
router.post("/crearWall", crearWall);
router.post("/historia/crearNuevaHistoria", crearNuevaHistoria);
router.post("/historia/continuarHistoria", continuarHistoria);
router.get("/:id", getWallById);
router.post("/lista", getWalls);
router.get("/historia/:idWall/:indiceHistoria", getHistory);
router.delete("/borrarHistoria", deleteHistory);
router.delete("/borrarWall", deleteWall);
router.post

module.exports = router;

function crearWall(req, resp){
    //let nuevoWall = _crearWall(req.body);
    let peticion = req.body;
    let nuevoWall = new Wall(peticion.wall);

    console.log(peticion);

    nuevoWall.save(function (err, nuevoWall){
         let notificacionNuevoWall = GestorNotificaciones.crearNotificacionNuevoWall(nuevoWall.contenidoTexto, null, nuevoWall.autor, nuevoWall.nombreAutor, nuevoWall._id, nuevoWall.titulo);
         GestorNotificaciones.addNotificacionFeed(notificacionNuevoWall, peticion.seguidores);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

function getWallById(req, resp){
    Wall.findById(req.params.id, function(err, wall){
        _devolverResultados(err, wall, resp);
    });
}

function getWalls(req, resp){
    let peticion = req.body;
    let i = (peticion.pagina - 1) * 20;

    Wall.find(_getFiltrosQuery(peticion.opciones, peticion.siguiendo),{},{skip: i, limit:20, sort:_obtenerCriteriosOrdenacion(peticion.opciones)}, function(err, walls){
        _devolverResultados(err, walls, resp );
    });
}

function crearNuevaHistoria(req, resp){
    let nuevaHistoria = _crearNuevaHistoria();
    let peticion = req.body;
    let nuevoInicioHistoria = new InicioHistoria(peticion.inicioHistoria);

    nuevaHistoria.save(function(err, nuevaHistoria) {
          //Añadimos la historia al wall
          nuevoInicioHistoria._id = nuevaHistoria._id;

          Wall.findOneAndUpdate({_id: peticion.idWall},{$push: {iniciosHistorias: nuevoInicioHistoria}}, function(err, wall){
              let notificacionNuevaHistoria = GestorNotificaciones.crearNotificacionNuevaHistoria(nuevoInicioHistoria.contenido, null, nuevoInicioHistoria.autor, nuevoInicioHistoria.autorName, peticion.idWall, wall.titulo, wall.iniciosHistorias.length);
              GestorNotificaciones.addNotificacionFeed(notificacionNuevaHistoria, peticion.seguidores);
              _devolverResultados(err, {resultado:"OK"}, resp);
          });
    });
}

function getHistory(req, resp){
    Wall.findById(req.params.idWall,{iniciosHistorias:1}, function(err, wall){
        console.log(wall);
        Historia.findById(wall.iniciosHistorias[req.params.indiceHistoria]._id,{comentarios:1}, function(err, historia){
            //Preparamos el objeto a devolver
            let historiaCompleta = new Array();
            historiaCompleta.push(wall.iniciosHistorias[req.params.indiceHistoria]);
            historiaCompleta.concat(historia.comentarios);
            _devolverResultados(err, historiaCompleta, resp);
        });
    });
}

function deleteHistory(req, resp){
    //Borramos el inicio de historia y los comentarios
    //TODO
}

function deleteWall(req, resp){
    let peticion = req.body;

    console.log(peticion.idWall);

    Historia.remove({idWall: peticion.idWall}, function(err){
        //Borramos ahora el wall
        if (!err){
            Wall.remove({_id: peticion.idWall}, function(err){
                _devolverResultados(err, {resultado:"OK"}, resp);
            })
        }else{
            _devolverResultados(err, {}, resp);
        }
    });
}

function continuarHistoria(req, resp){
    let peticion = req.body;
    let nuevaContinuacion = new ContinuacionHistoria(peticion.continuacionHistoria);

    Historia.findOneAndUpdate({_id: peticion.idHistoria}, {$push:{comentarios: nuevaContinuacion}}, function(err, historia){
        Wall.findById(peticion.idWall, {titulo:1}, function(err, wall){
            let notificacionNuevaContinuacionHistoria = GestorNotificaciones.crearNotificacionNuevaContinuacionHistoria(nuevaContinuacion.contenido, null, nuevaContinuacion.autor, nuevaContinuacion.autorName, peticion.idWall, wall.titulo, historia._id);
            let suscriptores = Utils.fusionarIDS(peticion.seguidores, historia.suscriptores);
            GestorNotificaciones.addNotificacionFeed(notificacionNuevaContinuacionHistoria, suscriptores);
            _devolverResultados(err, {resultado:"OK"}, resp);
        });
    });
}


function _crearNuevaHistoria(){
    let nuevaHistoria = new Historia({
        comentarios: new Array(),
        suscriptores: new Array(),
        likes:0,
        fecha:"27/10/2017"
    });

    return nuevaHistoria;
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

    return filtros;
}

function _devolverResultados(err, item, resp){

    if (err){
        resp.send("ERROR");
    }else{
        resp.send(item);
    }
}
