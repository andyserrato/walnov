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
router.get("/:userName", getBibliotecaByUserName);
// ChatStories
router.get("/:userName/chatstories", getChatStoriesOnBibliotecaByUserName);
router.post("/:userName/chatstories", addChatStoryOnBibliotecaByUserName);
router.delete("/:userName/chatstories", deleteChatStoryOnBibliotecaByUserName);
// Walls
router.get("/:userName/walls", getWallsOnBibliotecaByUserName);
router.post("/:userName/walls", addWallOnBibliotecaByUserName);
router.delete("/:userName/walls", deleteWallOnBibliotecaByUserName);
// Relatos
router.get("/:userName/relatos", getRelatosOnBibliotecaByUserName);
router.post("/:userName/relatos", addRelatoOnBibliotecaByUserName);
router.delete("/:userName/relatos", deleteRelatoOnBibliotecaByUserName);

module.exports = router;

function getBibliotecas(req, res) {
  Biblioteca.find({}, function (err, biblioteca) {
    if (err)
      res.status(400).send('Ha ocurrido un error');
    else
      res.status(200).send(biblioteca);
  });
}

function getBibliotecaByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findBibliotecaByUserName(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findBibliotecaByUserName = function (userId) {
    var query = {usuario: userId};

    Biblioteca.find(query, function (err, biblioteca) {
      if (err) {
        res.status(400).send("Ha ocurrido un error");
      }
      else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function getChatStoriesOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findChatStoriesBibliotecaByUserName(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findChatStoriesBibliotecaByUserName = function (userId) {
    var query = {usuario: userId};

    Biblioteca.find(query, '_id usuario chatStories', function (err, biblioteca) {
      if (err) {
        res.status(400).send("Ha ocurrido un error");
      }
      else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function addChatStoryOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let chatStoryId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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

function deleteChatStoryOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let chatStoryId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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
        biblioteca.chatStories.splice(biblioteca.chatStories.indexOf(chatStoryId),1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

// TODO probar endpoint y paginarlo
function getWallsOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findWallsBibliotecaByUserName(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findWallsBibliotecaByUserName = function (userId) {
    var query = {usuario: userId};

    Biblioteca.find(query, '_id usuario walls', function (err, biblioteca) {
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
function addWallOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let wallId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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
function deleteWallOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let wallId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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
        biblioteca.walls.splice(biblioteca.walls.indexOf(wallId),1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function getRelatosOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;

  User.findOne({login: userName}, '_id', function (err, userId) {
    if (err) {
      res.status(400).send('Ha ocurrido un error');
    }
    if (userId) {
      findRelatosBibliotecaByUserName(userId);
    } else {
      res.status(400).send('El usuario no se ha encontrado');
    }
  });

  var findRelatosBibliotecaByUserName = function (userId) {
    var query = {usuario: userId};

    Biblioteca.find(query, '_id usuario relatos', function (err, biblioteca) {
      if (err) {
        res.status(400).send("Ha ocurrido un error");
      }
      else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function addRelatoOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let relatoId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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
            if (mongoose.Types.ObjectId.isValid(wallId)) {
              biblioteca.relatos.push(wallId);
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

function deleteRelatoOnBibliotecaByUserName(req, res) {
  let userName = req.params.userName;
  let relatoId = req.body.id;

  User.findOne({login: userName}, '_id', function (err, userId) {
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
        biblioteca.relatos.splice(biblioteca.relatos.indexOf(relatoId),1);
        biblioteca.save(sendSave(err, biblioteca, res));
      } else {
        res.status(200).send(biblioteca);
      }
    });
  }
}

function getUserByLogin(userName, cb) {
  User.findOne({login: userName}, '_id', function (err, usu, wrc) {
    cb(usu, wrc);
  });
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




