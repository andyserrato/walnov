// Importamos lo que necesitamos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('debug', true);
const ChatStory = mongoose.model('ChatStory');
const Chat = mongoose.model('Chat');
const Estadistica = mongoose.model('Estadistica');
const usersController = require('../controllers/users2.server.controller');
const User = mongoose.model('usuarios');

// Rutas
router.post('/', crearChatStory);
router.get('/', getChatStories);

router.get('/:id', getChatStoryById);
router.put('/:id', updateChatStory);
router.get('/:id/visitas', updateVisitas);

router.get('/usuario/:userName', getChatStoriesByUserName);

module.exports = router;

// Implementaciones de las rutas
function crearChatStory(req, res) {
  let peticion = req.body;

  if (!peticion) {
    res.status(400).send("La entidad enviada se encuentra vacía");
  }

  let chatStory = new ChatStory(peticion);
  let estadistica = new Estadistica();
  estadistica.save(function (err) {
    if (err)
      console.log('oops');
  })
  chatStory.estadistica = estadistica;

  chatStory.save(function (err, newChatStory) {
    if (err)
      res.status(400).send("No se ha podido guardar la entidad");
    // Construir el link del chatStory
    // MiddleWare de notificaciones
    // Devolver la entidad
    res.status(200).send(newChatStory);

  });
}

function getChatStories(req, res) {
  let categoria = req.query.categoria;
  let autorNombre;
  let autorID;
  let titulo;
  let likes;
  let vecesVisto;
  let vecesCompartido;
  let compartidoenFTG;
  let fechaCreacion;
  let fechaModificacion;
  let limit;
  let sort; // Relevantes (los que tengan mejores estadísticas en un intervalo de tiempo), seguidos, no seguidos,
  let offset;


  ChatStory.find({}, function (err, chatStories) {
    if (err)
      res.status(400).send("Ha ocurrido un error");
    else
      res.status(200).send(chatStories);
  })
}

function getChatStoryById(req, res) {
  let id = req.params.id;

  ChatStory.findById(id)
    .populate('estadistica autor')
    .exec(function (err, chatStory) {
      if (err)
        res.status(400).send("No se encuentra el ChatStory");

      chatStory.estadistica.vecesVisto++;
      chatStory.estadistica.save(function (err) {
        if (err)
          res.status(400).send(err);
      })

      res.status(200).send(chatStory);
    });
}

function updateChatStory(req, res) {
  let id = req.params.id;

  ChatStory.where({_id: id})
    .update(req.body, function (err, writeOpResult) {
      if (err)
        res.status(400).send("Algo malo ha ocurrido");

      res.status(200).send(writeOpResult);
    });
}

function updateVisitas(req, res) {
  let id = req.params.id;

  ChatStory.findById(id)
    .populate('estadistica autor')
    .exec(function (err, chatStory) {
      chatStory.estadistica.vecesVisto++;
      chatStory.estadistica.save(function (err, lacosa) {
        if (err)
          res.send(err);
        else
          res.send(lacosa);
      })
    });
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
    ChatStory.find({autor: userId}, function (err, chatStories) {
      if (err)
        res.status(400).send("Algo malo ha ocurrido");
      else
        res.status(200).send(chatStories);
    })
  }
}
