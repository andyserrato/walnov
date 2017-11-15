// Importamos lo que necesitamos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Wall = mongoose.model('wall');
const Relato = mongoose.model('relato');
const ChatStory = mongoose.model('ChatStory');
const Biblioteca = mongoose.model('Biblioteca');

mongoose.set('debug', true);

// Rutas
router.get("/", getBibliotecas);
router.get("/:usuarioId", getBibliotecaByUserId);
// ChatStories
router.get("/:usuarioId/chatstories", getChatStoriesOnBibliotecaByUserId);
router.post("/:usuarioId/chatstories", addChatStoryOnBibliotecaByUserId);
router.delete("/:usuarioId/chatstories/", deleteChatStoryOnBibliotecaByUserId);
// Walls
router.get("/:usuarioId/walls", getWallsOnBibliotecaByUserId);
router.post("/:usuarioId/walls", addWallOnBibliotecaByUserId);
router.delete("/:usuarioId/walls", deleteWallOnBibliotecaByUserId);
// Relatos
router.get("/:usuarioId/relatos", getRelatosOnBibliotecaByUserId);
router.post("/:usuarioId/relatos", addRelatoOnBibliotecaByUserId);
router.delete("/:usuarioId/relatos", deleteRelatoOnBibliotecaByUserId);

module.exports = router;

function getBibliotecas(req, res) {
  Biblioteca.find({}, function (err, biblioteca) {
    if (err)
      res.status(400).send('Ha ocurrido un error');
    else
      res.status(200).send(biblioteca);
  });
}

function getBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;

  User.findById(usuarioId, 'id', function (err, userId) {
    if (err) {
      res.status(400).send({error: 'Usuario no encontrado'});
    }
    if (userId) {
      findBibliotecaByUserId(userId);
    } else {
      res.status(400).send({error: 'Error en operación de usuario'});
    }
  });

  var findBibliotecaByUserId = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query)
      .exec(function (err, biblioteca) {
        if (err) {
          res.status(400).send({error: 'Error obteniendo biblioteca'});
        }
        else if (biblioteca) {
          res.status(200).send(biblioteca);
        } else {
          let biblioteca = new Biblioteca();
          biblioteca.usuario = userId;
          biblioteca.save((err, bibliotecaGuardada) => {
            if (err) res.status(400).send(err);
            res.status(200).send(bibliotecaGuardada);
          });
        }
      });
  }
}

function getChatStoriesOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findChatStoriesBibliotecaByUserId(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findChatStoriesBibliotecaByUserId = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query)
      .populate({path: 'chatStories', options: { sort: { fechaCreacion: -1 }}})
      .populate({path: 'chatStories', populate: { path: 'autor estadistica'}, options: { sort: { fechaCreacion: -1 }}})
      .exec(function (err, biblioteca) {
        if (err) {
          res.status(400).send("Ha ocurrido un error");
        }
        else {
          res.status(200).send(biblioteca);
        }
      });
  }
}

function addChatStoryOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let chatStoryId = req.body.id;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findOrCreateBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findOrCreateBiblioteca = function (userId) {
    var query = {usuario: userId}, // colocar el not in
      update = {$push: {chatStories: chatStoryId}},
      options = {upsert: true, new: true, setDefaultsOnInsert: true};

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("No se puede guardar");
      }
      else {
        if (!biblioteca) {
          // la biblioteca no está creada
          biblioteca = new Biblioteca({
            usuario: userId,
            walls: [],
            chatStories: [chatStoryId],
            relatos: []
          });

          biblioteca.save(sendSave(err, biblioteca, res));
        } else {
          if (biblioteca.chatStories.indexOf(chatStoryId) === -1) {
            // hay que comprobar que el chat exista o que no se metan ids mal formados
            if (mongoose.Types.ObjectId.isValid(chatStoryId)) {
              biblioteca.chatStories.push(chatStoryId);
              biblioteca.save(sendSave(err, biblioteca, res));
            } else {
              res.status(400).send("No es un ID válido");
            }

          } else {
            res.status(200).send(biblioteca);
          }
        }
      }
    });
  }
}

function deleteChatStoryOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let chatStoryId = req.body.id;
  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      deleteChatStoryOnUsersBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var deleteChatStoryOnUsersBiblioteca = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("Error");
      }

      if (!biblioteca) {
        res.status(400).send("No existe biblioteca");
      } else if (biblioteca && !biblioteca.chatStories) {
        res.status(400).send("No existe biblioteca");
      }

      if (biblioteca.chatStories.indexOf(chatStoryId) !== -1) {
        biblioteca.chatStories.splice(biblioteca.chatStories.indexOf(chatStoryId), 1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

// TODO probar endpoint y paginarlo
function getWallsOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findWallsBibliotecaByUserId(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findWallsBibliotecaByUserId = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query)
      .populate({path: 'walls', options: { sort: { fechaCreacion: -1 }}})
      .populate({path: 'walls', populate: { path: 'autor estadistica'}, options: { sort: { fechaCreacion: -1 }}})
      .exec(function (err, biblioteca) {
        if (err) {
          res.status(400).send("Ha ocurrido un error");
        }
        else {
          res.status(200).send(biblioteca);
        }
      });
  }
}

// TODO probar endpoint
function addWallOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let wallId = req.body.id;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findOrCreateBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findOrCreateBiblioteca = function (userId) {
    var query = {usuario: userId}; // colocar el not in

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("No se puede guardar");
      }
      else {
        if (!biblioteca) {
          // la biblioteca no está creada
          biblioteca = new Biblioteca({
            usuario: userId,
            walls: [wallId],
            chatStories: [],
            relatos: []
          });

          biblioteca.save(sendSave(err, biblioteca, res));
        } else {
          if (biblioteca.walls.indexOf(wallId) === -1) {
            // hay que comprobar que el wall exista o que no se metan ids mal formados
            if (mongoose.Types.ObjectId.isValid(wallId)) {
              biblioteca.walls.push(wallId);
              biblioteca.save(sendSave(err, biblioteca, res));
            } else {
              res.status(400).send("No es un ID válido");
            }

          } else {
            res.status(200).send(biblioteca);
          }
        }
      }
    });
  }
}

// TODO probar endpoint
function deleteWallOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let wallId = req.body.id;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      deleteWallOnUsersBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var deleteWallOnUsersBiblioteca = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("Error");
      }

      if (!biblioteca) {
        res.status(400).send("No existe biblioteca");
      } else if (biblioteca && !biblioteca.walls) {
        res.status(400).send("No existe biblioteca");
      }

      if (biblioteca.walls.indexOf(wallId) !== -1) {
        biblioteca.walls.splice(biblioteca.walls.indexOf(wallId), 1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function getRelatosOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findRelatosBibliotecaByUserId(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findRelatosBibliotecaByUserId = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query)
      .populate({path: 'relatos', options: { sort: { fechaCreacion: -1 }}})
      .populate({path: 'relatos', populate: { path: 'autor estadistica'}, options: { sort: { fechaCreacion: -1 }}})
      .exec(function (err, biblioteca) {
        if (err) {
          res.status(400).send("Ha ocurrido un error");
        }
        else {
          res.status(200).send(biblioteca);
        }
      });
  }
}

function addRelatoOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let relatoId = req.body.id;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findOrCreateBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findOrCreateBiblioteca = function (userId) {
    var query = {usuario: userId}; // colocar el not in

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("No se puede guardar");
      }
      else {
        if (!biblioteca) {
          // la biblioteca no está creada
          biblioteca = new Biblioteca({
            usuario: userId,
            walls: [],
            chatStories: [],
            relatos: [relatoId]
          });

          biblioteca.save(sendSave(err, biblioteca, res));
        } else {
          if (biblioteca.relatos.indexOf(relatoId) === -1) {
            // hay que comprobar que el wall exista o que no se metan ids mal formados
            if (mongoose.Types.ObjectId.isValid(relatoId)) {
              biblioteca.relatos.push(relatoId);
              biblioteca.save(sendSave(err, biblioteca, res));
            } else {
              res.status(400).send("No es un ID válido");
            }

          } else {
            res.status(200).send(biblioteca);
          }
        }
      }
    });
  }
}

function deleteRelatoOnBibliotecaByUserId(req, res) {
  let usuarioId = req.params.usuarioId;
  let relatoId = req.body.id;

  User.findById(usuarioId, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      deleteRelatoOnUsersBiblioteca(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var deleteRelatoOnUsersBiblioteca = function (userId) {
    var query = {usuario: userId};

    Biblioteca.findOne(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("Error");
      }

      if (!biblioteca) {
        res.status(400).send("No existe biblioteca");
      } else if (biblioteca && !biblioteca.relatos) {
        res.status(400).send("No existe biblioteca");
      }

      if (biblioteca.relatos.indexOf(relatoId) !== -1) {
        biblioteca.relatos.splice(biblioteca.relatos.indexOf(relatoId), 1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function sendSave(err, entity, res) {
  if (err) {
    res.status(400).send('Ha ocurrido un error');
  }
  else if (entity) {
    res.status(200).send(entity);
  } else {
    res.status(400).send('Ha ocurrido un error');
  }
}
