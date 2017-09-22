const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('debug', true);

//Modelos
const Relato = mongoose.model('relato');
const OpinionRelato = mongoose.model('opinionRelato');
const Estadistica = mongoose.model('Estadistica');
const User = mongoose.model('usuarios');

//Constantes y Factorias
const GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
const Constantes = require("../constantes/constantes");

router.post("/", crearNuevoRelato);
router.get("/", getRelatos);
router.get("/:idRelato", getRelatoById);
router.put('/', updateRelato);
router.post("/opinion", crearNuevaOpinion);
router.post("/responderOpinion", responderOpinion);

router.post("/lista", obtenerRelatos);
router.delete("/", borrarRelato);

module.exports = router;

function crearNuevoRelato(req, resp) {
  let peticion = req.body;

  if (!peticion) {
    resp.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
  } else {
    let nuevoRelato = new Relato(peticion.relato);
    let estadistica = new Estadistica();

    estadistica.save(function (err, estadistica) {
      if (err) {
        // TODO evaluar y mirar lo de eliminar en caso de error para agregar algo de atomicidad
        resp.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
      } else {
        nuevoRelato.estadistica = estadistica;

        nuevoRelato.save(function (err, nuevoRelato) {
          let notificacionNuevoRelato = GestorNotificaciones.crearNotificacionNuevoRelato(nuevoRelato.texto, null, nuevoRelato.autor, nuevoRelato.autorNombre, nuevoRelato._id, nuevoRelato.tituloRelato);

          if (!peticion.seguidores) {
            User.findOne({_id: nuevoRelato.autor}, function (err, usu) {
              if (err) {
                resp.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
              }

              usu.increaseRelatosCreated(function (err) {
                  if (err) {
                    resp.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
                  }
                  GestorNotificaciones.addNotificacionFeed(notificacionNuevoRelato, usu.seguidores);
                  _devolverResultados(err, nuevoRelato, resp);
                }
              );

            });
          } else {
            GestorNotificaciones.addNotificacionFeed(notificacionNuevoRelato, peticion.seguidores);
            _devolverResultados(err, nuevoRelato, resp);
          }
        });
      }
    });
  }


}

function getRelatoById(req, res) {
  // Relato.findById(req.params.idRelato, function (err, relato) {
  //   _devolverResultados(err, relato, resp);
  // });

  let id = req.params.id;
  let idUsuario = req.query.usuarioId;
  Relato.findById(id)
    .populate('estadistica autor')
    .exec(function (err, relato) {
      if (err)
        res.status(400).send("No se encuentra el relato");

      // Relato no es borrador
      if (relato.tipo != 1)
        relato.estadistica.vecesVisto++;

      if (idUsuario && relato.estadistica.visitas.indexOf(idUsuario) === -1) {
        relato.estadistica.visitas.push(idUsuario);
      }

      relato.estadistica.save(function (err) {
        if (err)
          res.status(400).send(err);

        res.status(200).send(relato);
      });
    });
}

function obtenerRelatos(req, resp) {
  let peticion = req.body;
  let i = (peticion.pagina - 1) * 20;

  Relato.find(_getFiltrosQuery(peticion.opciones, peticion.siguiendo), {}, {
    skip: i,
    limit: 20,
    sort: _obtenerCriteriosOrdenacion(peticion.opciones)
  }, function (err, relatos) {
    _devolverResultados(err, relatos, resp);
  });
}

function borrarRelato(req, resp) {
  let peticion = req.body;

  Relato.remove({_id: peticion.idRelato}, function (err) {
    _devolverResultados(err, {resultado: "OK"}, resp);
  });
}

function responderOpinion(req, resp) {
  let update = {};
  let peticion = req.body;
  let respuesta = new OpinionRelato(peticion.respuesta);
  update["opiniones." + peticion.indiceOpinion + ".respuesta"] = respuesta;

  Relato.findOneAndUpdate({_id: req.body.idRelato}, {$set: update}, function (err, response) {
    _devolverResultados(err, {resultado: "OK"}, resp);
  });
}

function crearNuevaOpinion(req, resp) {
  let peticion = req.body;
  let nuevaOpinionRelato = new OpinionRelato(peticion.nuevaOpinion);

  Relato.findOneAndUpdate({_id: peticion.idRelato}, {$push: {opiniones: nuevaOpinionRelato}}, function (err, relato) {
    let nuevaNotificacionOpinionRelato = GestorNotificaciones.crearNotificacionNuevaOpinionRelato(nuevaOpinionRelato.texto, new Date(), nuevaOpinionRelato.autor, nuevaOpinionRelato.autorNombre, relato._id, relato.tituloRelato);
    GestorNotificaciones.addNotificacionFeed(nuevaNotificacionOpinionRelato, peticion.seguidores);
    _devolverResultados(err, {resultado: "OK"}, resp);
  });
}

function _getFiltrosQuery(opciones, siguiendo) {
  let filtros = {};

  //Filtro por gente a la que sigue el usuario o todo el mundo
  if (opciones.siguiendo == true) {
    //De los usuarios a los que esta siguiiendo el usuario
    filtros = {autor: {$in: siguiendo}};
  }

  //Filtro por categoria
  if (opciones.hasOwnProperty("categoria")) {
    filtros.categoria = opciones.categoria;
  }

  //Filtro por tags
  if (opciones.hasOwnProperty("tags")) {
    filtros.tags = {$in: opciones.tags}
  }

  return filtros;
}

function _obtenerCriteriosOrdenacion(opciones) {
  let ordenacion = {};

  if (opciones.hasOwnProperty("likes")) {
    ordenacion = {likes: -1};
  } else if (opciones.hasOwnProperty("vecesVisto")) {
    ordenacion = {vecesVisto: -1};
  } else if (opciones.hasOwnProperty("compartidoFacebook")) {
    ordenacion = {compartidoFacebook: -1};
  } else if (opciones.hasOwnProperty("compartidoTwitter")) {
    ordenacion = {compartidoTwitter: -1};
  } else if (opciones.hasOwnProperty("compartidoGoogle")) {
    ordenacion = {compartidoGoogle: -1};
  }

  return ordenacion;
}

function _devolverResultados(err, item, resp) {

  if (err) {
    resp.status(400).send(err);
  } else {
    resp.status(200).send(item);
  }
}

function getRelatos(req, res) {
  let query = Relato.find();
  // query.select('titulo categoria autorNombre descripcion autor estadistica fechaCreacion');
  query.populate('estadistica autor');
  if (req.query && req.query.categoria) {
    query.where('categoria').equals(req.query.categoria);
  }

  if (req.query && req.query.titulo) {
    query.where('titulo').equals(req.query.titulo);
  }

  if (req.query && req.query.autorNombre) {
    query.where('autorNombre').equals(req.query.autorNombre);
  }

  if (req.query && req.query.autor && !req.query.timeLine) {
    query.where('autor').equals(req.query.autor);
  }

  if (req.query && req.query.lang) {
    query.where('lang').equals(req.query.lang);
  }

  if (req.query && req.query.tipo) {
    query.where('tipo').equals(req.query.tipo);
  }

  if (req.query && req.query.titulo) {
    query.find({$text: {$search: req.query.titulo}});
  }

  if (req.query && req.query.sort) {
    let sortQueries = req.query.sort.split(',');

    for (i = 0; i < sortQueries.length; i++) {
      if (sortQueries[i].indexOf('fechaModificacion') !== -1) {
        query.sort(sortQueries[i]);
      } else if (sortQueries[i].indexOf('fechaCreacion') !== -1) {
        query.sort(sortQueries[i]);
      } else if (sortQueries[i].indexOf('vecesVisto') !== -1) {
        if (sortQueries[i].indexOf('-vecesVisto') !== -1) {
          query.sort('-estadistica.vecesVisto');
        } else if (sortQueries[i].indexOf('+vecesVisto') !== -1) {
          query.sort('+estadistica.vecesVisto');
        }
      } else if (sortQueries[i].indexOf('likes') !== -1) {
        if (sortQueries[i].indexOf('-likes') !== -1) {
          query.sort('-estadistica.likes');
        } else if (sortQueries[i].indexOf('+likes') !== -1) {
          query.sort('+estadistica.likes');
        }
      } else if (sortQueries[i].indexOf('vecesCompartido') !== -1) {
        if (sortQueries[i].indexOf('-vecesCompartido') !== -1) {
          query.sort('-estadistica.vecesCompartido');
        } else if (sortQueries[i].indexOf('+vecesCompartido') !== -1) {
          query.sort('+estadistica.vecesCompartido');
        }
      } else if (sortQueries[i].indexOf('relevantes') !== -1) {
        query.sort('-estadistica.likes');
        query.sort('-estadistica.vecesCompartido');
        query.sort('-estadistica.vecesVisto');
      }
    }
  }

  // paginacion
  query.limit((isNaN(req.query.top)) ? 10 : +req.query.top);
  query.skip((isNaN(req.query.skip)) ? 0 : +req.query.skip);
  query.where('activo').equals(true);
  query.where('estadistica').ne(null);

  if (req.query && req.query.autor && req.query.timeLine && (req.query.timeLine === 'followers' || req.query.timeLine === 'following')) {
    User.findById(req.query.autor, (err, user) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        if (req.query.timeLine === 'followers' && user.seguidores.length > 0) {
          query.where('autor').in(user.seguidores);
          ejecutarQuery();
        } else if (req.query.timeLine === 'following' && user.siguiendo.length > 0) {
          ejecutarQuery();
        } else if (req.query.timeLine === 'following' && user.siguiendo.length === 0) {
          res.status(400).send(new Error("No estas siguiendo a nadie"));
        } else if (req.query.timeLine === 'followers' && user.seguidores.length === 0) {
          res.status(400).send(new Error("No tienes seguidores"));
        }
      }
    });
  } else {
    ejecutarQuery();
  }

  function ejecutarQuery() {
    query.exec(function (err, relatos) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(relatos);
      }
    });
  }
}

function updateRelato(req, res) {
  let id = req.body.relato.id;
  let relato = req.body.relato;
  if (!id || id === undefined) {
    res.status(400).send('Debes proporcionar el id del Relato');
  } else if (!relato || relato === undefined) {
    res.status(400).send('El Relato se encuentra vacío');
  } else {
    Relato.findByIdAndUpdate(id, relato, {new: true},
      function (err, updatedRelato) {
        if (err)
          res.status(400).send("Ha ocurrido un error al actualizar el Relato " + err);

        res.status(200).send(updatedRelato);
      });
  }
}
