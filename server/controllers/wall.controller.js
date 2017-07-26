
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Modelos
var Wall = require('mongoose').model('wall');
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
router.post("/votarContinuacion", votarContinuacion);
router.get("/historia/:idWall/:indiceHistoria", getHistory);
router.delete("/borrarHistoria", deleteHistory);
router.delete("/borrarWall", deleteWall);
router.post

module.exports = router;

function crearWall(req, resp){
    //let nuevoWall = _crearWall(req.body);
    let peticion = req.body;
    let nuevoWall = new Wall(peticion.wall);

    nuevoWall.save(function (err, nuevoWall){
         let notificacionNuevoWall = GestorNotificaciones.crearNotificacionNuevoWall(nuevoWall.contenidoTexto, null, nuevoWall.autor, nuevoWall.nombreAutor, nuevoWall._id, nuevoWall.titulo);
         GestorNotificaciones.addNotificacionFeed(notificacionNuevoWall, peticion.seguidores);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
}

//Esta función devolverá el wall, los inicios de historia, y la historia más valorada
function getWallById(req, resp){
/*    let respuesta = {};

    Wall.findById(req.params.id, function(err, wall){
        respuesta.wall = wall;

        //Inicios de historia
        _obtenerIniciosDeHistoria(req.params.id).then(iniciosHistorias => {
            respuesta.iniciosHistorias = iniciosHistorias;

            //Obtenemos la historia más valorada
            if (respuesta.iniciosHistorias.length == 0){
                _devolverResultados(err, respuesta, resp);
            }else{
                Historia.findById(respuesta.iniciosHistorias[0]._id, function(err, historiaMasValorada){
                    respuesta.historiaMasValorada = historiaMasValorada;
                    _devolverResultados(err, respuesta, resp);
                });
            }

        });

    });
    */
}

function getWalls(req, resp){
    let peticion = req.body;
    let i = (peticion.pagina - 1) * 20;

    Wall.find(_getFiltrosQuery(peticion.opciones, peticion.siguiendo),{},{skip: i, limit:20, sort:_obtenerCriteriosOrdenacion(peticion.opciones)}, function(err, walls){
        _devolverResultados(err, walls, resp );
    });
}

function crearNuevaHistoria(req, resp){
    let peticion = req.body;
    let nuevaHistoria = _crearNuevaHistoria(peticion);
    let nuevoInicioHistoria = new InicioHistoria(peticion.inicioHistoria);

    /*nuevaHistoria.comentarios.push(nuevoInicioHistoria);

    nuevaHistoria.save(function(err, nuevaHistoria) {
          Wall.update({_id: peticion.idWall},{$push: {iniciosHistorias: nuevaHistoria._id}}, function(err, resultado){
              let notificacionNuevaHistoria = GestorNotificaciones.crearNotificacionNuevaHistoria(nuevoInicioHistoria.contenido, null, nuevoInicioHistoria.autor, nuevoInicioHistoria.autorName, peticion.idWall, peticion.titulo, nuevaHistoria._id);
              GestorNotificaciones.addNotificacionFeed(notificacionNuevaHistoria, peticion.seguidores);
              _devolverResultados(err, {resultado:"OK"}, resp);
          });
    });
    */
}

function getHistory(req, resp){
        /*Historia.findById(peticion.idHistoria,{comentarios:1}, function(err, historia){
            //Preparamos el objeto a devolver
            let historiaCompleta = new Array();
            historiaCompleta.push(wall.iniciosHistorias[req.params.indiceHistoria]);
            historiaCompleta.concat(historia.comentarios);
            _devolverResultados(err, historiaCompleta, resp);
        });*/
}

function deleteHistory(req, resp){
    //Borramos el inicio de historia y los comentarios
    //TODO
}

function deleteWall(req, resp){
    let peticion = req.body;

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

    /*Historia.findOneAndUpdate({_id: peticion.idHistoria},{$push:{comentarios: nuevaContinuacion}}, {fields:{suscriptores:1}},function(err, historia){
        //Añadimos la notificacion
        let notificacionNuevaContinuacionHistoria = GestorNotificaciones.crearNotificacionNuevaContinuacionHistoria(nuevaContinuacion.contenido, null, nuevaContinuacion.autor, nuevaContinuacion.autorName, peticion.idWall, peticion.titulo, historia._id);
        let suscriptores = Utils.fusionarIDS(peticion.seguidores, historia.suscriptores);
        GestorNotificaciones.addNotificacionFeed(notificacionNuevaContinuacionHistoria, suscriptores);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
    */
}

function votarContinuacion(req, resp){
    let peticion = req.body;
    let update = {};
    let update2 = {};

    //Suma 1
    update["comentarios." + peticion.indiceItem + ".likes"] = 1;
    update["likes"] = 1;
    //Incluye al usuario que vota en likers
    update2["comentarios." + peticion.indiceItem + ".likers"] = peticion.idUsuario;
    update2["likers"] = peticion.idUsuario;

    /*Historia.update({_id: peticion.idHistoria},{$inc: update, $push: update2}, function(err, result){
        console.log(result);
        _devolverResultados(err, {resultado:"OK"}, resp);
    });
    */
}

function _obtenerIniciosDeHistoria(idWall){
    /*let iniciosHistorias = {};

    let promise = new Promise((resolve) => {
        Historia.aggregate([
        {
            $match: {
                'idWall': mongoose.Types.ObjectId(idWall)
            }
        },
        {
            $project: {
                comentarios: {
                    $slice: [ "$comentarios", 1 ]
                },
                likes:1
            }
        },
        {
            $sort:{
                likes: -1
            }
        }],
        function(err, resultados){
            iniciosHistorias = resultados;
            resolve(iniciosHistorias);
        });

    });

    return promise;
    */
}

function _crearNuevaHistoria(peticion){
    let nuevaHistoria = new Historia({
        comentarios: new Array(),
        suscriptores: new Array(),
        likes:0,
        fecha:"27/10/2017",
        idWall: peticion.idWall
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
