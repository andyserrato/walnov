// Importamos lo que necesitamos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('debug', true);
const ChatStory = mongoose.model('ChatStory');
const Chat = mongoose.model('Chat');
const Estadistica = mongoose.model('Estadistica');
const User = mongoose.model('usuarios');
const GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
const NotificacionNuevoChatStory = mongoose.model('notificacionNuevoChatStory');
const Constantes = require("../constantes/constantes");

// Rutas
router.post('/', crearChatStory);
router.get('/', getChatStories);

router.get('/:id', getChatStoryById);
router.put('/like', updateLike);
router.put('/compartido', updateCompartido);
router.put('/', updateChatStory);

router.put('/:id/visitas', updateVisitas);

router.get('/usuario/:userName', getChatStoriesByUserName);
router.get('/user/:userName', getChatStoriesByUserName);

router.get('/usuario/:userName/feed', getFeedByUserName);

router.get('/misChatStories/:userName', getMisChatStoriesByUserName);

module.exports = router;

// Implementaciones de las rutas
function crearChatStory(req, res) {
  let peticion = req.body.chatStory;
  if (!peticion) {
    res.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
  } else {

    let chatStory = new ChatStory(peticion);
    let estadistica = new Estadistica();
    estadistica.save(function (err) {
      if (err) {
        res.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
      }
    });
    chatStory.estadistica = estadistica;

    chatStory.save(function (err, newChatStory) {
      if (err) {
        res.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
      } else {
        var notificacionNuevoChatStory = GestorNotificaciones.crearNotificacionNuevoChatstory(
          req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.creado : Constantes.Mensajes.MENSAJES.en.created,
          Date.now().toString(),
          newChatStory.autor,
          newChatStory.autorNombre,
          newChatStory.id,
          newChatStory.titulo
        );

        if (!peticion.seguidores) {
          User.findOne({_id: newChatStory.autor}, function (err, usu) {
            if (err)
              res.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
            usu.increaseChatStoriesCreated(function (err) {
                if (err)
                  res.status(400).send(req.body.lang === 'es' ? Constantes.Mensajes.MENSAJES.es.error : Constantes.Mensajes.MENSAJES.en.error);
                notificar(notificacionNuevoChatStory, usu.seguidores, newChatStory);
              }
            );

          });
        } else {
          notificar(notificacionNuevoChatStory, peticion.usuario.seguidores, newChatStory);
        }
      }
    });
  }

  function notificar(notificacionNuevoChatStory, seguidores, newChatStory) {
    GestorNotificaciones.addNotificacionFeed(notificacionNuevoChatStory, seguidores);
    res.status(200).send(newChatStory);
  }
}

function getChatStories(req, res) {
  let query = ChatStory.find();
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
      } else if (sortQueries[i].indexOf('fechaModificacion') === -1) {
        query.sort('-fechaModificacion');
      } else if (sortQueries[i].indexOf('fechaCreacion') === -1) {
        query.sort('-fechaCreacion');
      }
    }
  } else {
    console.log('dfjksdlfjsdlFJKDLSFJSKDLFJSKDFJKLSDJFKLSDJFKLJSDKLFJSDKLJFKLSDJFLDASDASDAS');
    query.sort('-fechaModificacion');
    query.sort('-fechaCreacion');
  }

  // paginacion
  query.limit((isNaN(req.query.top)) ? 10 : +req.query.top);
  query.skip((isNaN(req.query.skip)) ? 0 : +req.query.skip);
  query.where('activo').equals(true);
  query.where('estadistica').ne(null);

  if (req.query && req.query.autor && req.query.timeLine && (req.query.timeLine === 'followers' || req.query.timeLine === 'following')) {
    User.findById(req.query.autor, (err, user) => {
      if(err) {
        res.status(400).send(err);
      }
      else {
        if(req.query.timeLine === 'followers' && user.seguidores.length > 0
  )
    {
      query.where('autor').in(user.seguidores);
      ejecutarQuery();
    }
  else
    if (req.query.timeLine === 'following' && user.siguiendo.length > 0) {
      query.where('autor').in(user.seguidores);
      ejecutarQuery();
    } else if (req.query.timeLine === 'following' && user.siguiendo.length === 0) {
      res.status(400).send(new Error("No estas siguiendo a nadie"));
    } else if (req.query.timeLine === 'followers' && user.seguidores.length === 0) {
      res.status(400).send(new Error("No tienes seguidores"));
    }
  }
  })
    ;
  } else {
    ejecutarQuery();
  }

  function ejecutarQuery() {
    query.exec(function (err, chatStories) {
      if (err) {
        res.status(400).send({error: err});
      } else {
        res.status(200).send(chatStories);
      }
    });
  }
}


function getChatStoryById(req, res) {
  let id = req.params.id;
  let idUsuario = req.query.usuarioId;
  ChatStory.findById(id)
    .populate('estadistica autor')
    .exec(function (err, chatStory) {
      if (err || chatStory === null) {
        res.status(400).send("No se encuentra el ChatStory");
      } else {
        // ChatStory no es borrador
        if (chatStory.estadistica === null)
          chatStory.estadistica = new Estadistica();

        if (chatStory && chatStory.tipo != 1 && chatStory.estadistica)
          chatStory.estadistica.vecesVisto++;

        if (idUsuario && chatStory && chatStory.estadistica && chatStory.estadistica.visitas.indexOf(idUsuario) === -1) {
          chatStory.estadistica.visitas.push(idUsuario);
        }

        chatStory.estadistica.save(function (err) {
          if (err)
            res.status(400).send(err);

          res.status(200).send(chatStory);
        })
      }
    });
}

function updateChatStory(req, res) {
  let id = req.body.chatStory.id;
  let chatStory = req.body.chatStory;
  if (!id || id === undefined) {
    res.status(400).send('Debes proporcionar el id del Chatstory');
  } else if (!chatStory || chatStory === undefined) {
    res.status(400).send('El ChatStory se encuentra vacío');
  } else {
    ChatStory.findByIdAndUpdate(id, chatStory, {new: true},
      function (err, updatedChatStory) {
        if (err)
          res.status(400).send("Ha ocurrido un error al actualizar el ChatStory " + err);

        res.status(200).send(updatedChatStory);
      });
  }
}

function updateVisitas(req, res) {
  let id = req.params.id;
  let idUsuario = req.body.usuario.id;
  ChatStory.findById(id)
    .populate('estadistica autor')
    .exec(function (err, chatStory) {

      if (idUsuario && chatStory.estadistica.visitas.indexOf(idUsuario) === -1) {
        chatStory.estadistica.visitas.push(idUsuario);
      }

      if (chatStory && chatStory.estadistica && chatStory.estadistica.vecesVisto && (chatStory.estadistica.vecesVisto / 50 > 1 )) {
        // TODO notificacion aquí
      }

      chatStory.estadistica.vecesVisto++;
      chatStory.estadistica.save(function (err, resultados) {
        if (err)
          res.send(err);
        else
          res.send(resultados);
      })
    });
}

function updateCompartido(req, res) {
  let id = req.body.chatStoryId;
  let idUsuario = req.body.usuarioId;
  let redSocial = req.body.redSocial;

  if (id === undefined || idUsuario === undefined || redSocial === undefined) {

    res.status(400).send({
      error: 'ERROR PARÁMETROS MALFORMADOS'
    });
  } else {
    ChatStory.findById(id)
      .populate('estadistica autor')
      .exec(function (err, chatStory) {

        if (err) {
          res.status(400).send({
            error: 'ERROR'
          });
        }

        if (chatStory) {
          chatStory.estadistica.vecesCompartido++;

          if (redSocial && (redSocial === 'facebook') && chatStory) {
            chatStory.estadistica.vecesCompartidoFacebook++;

            if (idUsuario && chatStory.estadistica.compartidoFacebook.indexOf(idUsuario) === -1) {
              chatStory.estadistica.compartidoFacebook.push(idUsuario);
            }

            if (chatStory.estadistica.vecesCompartidoFacebook / 50 > 1) {
              // TODO notificacion  de cantidad aquí
            }

          } else if (redSocial && (redSocial === 'twitter')) {
            chatStory.estadistica.vecesCompartidoTwitter++;

            if (idUsuario && chatStory.estadistica.compartidoTwitter.indexOf(idUsuario) === -1) {
              chatStory.estadistica.compartidoTwitter.push(idUsuario);
            }

            if (chatStory.estadistica.vecesCompartidoTwitter / 50 > 1) {
              // TODO notificacion  de cantidad aquí
            }

          } else if (redSocial && (redSocial === 'google')) {
            chatStory.estadistica.vecesCompartidoGoogle++;

            if (idUsuario && chatStory.estadistica.compartidoGoogle.indexOf(idUsuario) === -1) {
              chatStory.estadistica.compartidoGoogle.push(idUsuario);
            }

            if (chatStory.estadistica.vecesCompartidoGoogle / 50 > 1) {
              // TODO notificacion  de cantidad aquí
            }

          }
        }

        // TODO notificación de que un puto le ha dado a compartir aquí

        chatStory.estadistica.save(function (err, resultados) {
          if (err) {
            res.status(400).send({
              error: err
            });
          }
          else
            res.send(resultados);
        })
      });
  }

}

function updateLike(req, res) {
  let id = req.body.chatStoryId;
  let idUsuario = req.body.usuarioId;

  if (id === undefined || idUsuario === undefined) {
    res.status(404).send('El id del relato y el id del usuario son campos requeridos');
  } else {
    ChatStory.findById(id)
      .populate('estadistica autor')
      .exec(function (err, chatStory) {
        if (chatStory.estadistica === null)
          chatStory.estadistica = new Estadistica();

        // Así comprobamos que el puto ya le ha dado a like
        if (idUsuario && chatStory.estadistica.likers.indexOf(idUsuario) === -1) {
          chatStory.estadistica.likers.push(idUsuario);
          chatStory.estadistica.likes++;
          if (chatStory && chatStory.estadistica && chatStory.estadistica.likes && (chatStory.estadistica.likes / 50 > 1 )) {
            // TODO notificacion  de cantidad aquí
          }

          // TODO notificación de que un puto le ha dado a like aquí
        }

        chatStory.estadistica.save(function (err, resultados) {
          if (err)
            res.send(err);
          else
            res.send(resultados);
        })
      });
  }
}

function getChatStoriesByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, usu) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    } else if (!usu) {
      res.status(200).send('No se ha encontrado el usuario');
    } else if (usu) {
      getChatStoriesByLogin(usu);
    } else {
      res.status(400).send('Ha ocurrido un error');
    }
  });

  function getChatStoriesByLogin(userId) {
    let query = ChatStory.find({autor: userId});

    query.exec(function (err, chatStories) {
      if (err)
        res.status(400).send("Algo malo ha ocurrido");
      else
        res.status(200).send(chatStories);
    });
  }
}

/**
 *  Obtiene los chatstories para las vistas de chatStories de creación paso1 y paso2
 * @param req objeto de request.
 * @param res objeto de response.
 */
function getMisChatStoriesByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, usu) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    } else if (!usu) {
      res.status(200).send('No se ha encontrado el usuario');
    } else if (usu) {
      getChatStoriesByLogin(usu);
    } else {
      res.status(400).send('Ha ocurrido un error');
    }
  });

  function getChatStoriesByLogin(userId) {
    let query = ChatStory.find({autor: userId});
    query.sort('-fechaModificacion');
    query.select('titulo fechaModificacion');

    query.exec(function (err, chatStories) {
      if (err)
        res.status(400).send("Algo malo ha ocurrido");
      else
        res.status(200).send(chatStories);
    });
  }
}

/**
 *  Obtiene los chatstories de los usuario que sigue un determinado usuario.
 * @param req objeto de request.
 * @param res objeto de response.
 */
function getFeedByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, 'siguiendo', function (err, usu) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    } else if (!usu) {
      res.status(200).send('No se ha encontrado el usuario');
    } else if (usu) {
      getChatStoriesByLogin(usu);
    } else {
      res.status(400).send('Ha ocurrido un error');
    }
  });

  function getChatStoriesByLogin(siguiendo) {
    let query = ChatStory.find();
    query.sort('-fechaModificacion');
    query.where('autor').in(siguiendo);
    query.exec(function (err, chatStories) {
      if (err)
        res.status(400).send("Algo malo ha ocurrido");
      else
        res.status(200).send(chatStories);
    });
  }

}
