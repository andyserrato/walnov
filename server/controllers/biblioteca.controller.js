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

function getWallsOnBibliotecaByUserName(req, res) {
 // TODO [ANDY] Biblioteca
}

function addWallOnBibliotecaByUserName(req, res) {
// TODO [ANDY] Biblioteca
}

function deleteWallOnBibliotecaByUserName(req, res) {
// TODO [ANDY] Biblioteca
}

function getRelatosOnBibliotecaByUserName(req, res) {
// TODO [ANDY] Biblioteca
}

function addRelatoOnBibliotecaByUserName(req, res) {
// TODO [ANDY] Biblioteca
}

function deleteRelatoOnBibliotecaByUserName(req, res) {
// TODO [ANDY] Biblioteca
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




