var express = require('express');
var router = express.Router();

router.post('/nuevoChatStory', crearNuevoChatStory);

module.exports = router;

function crearNuevoChatStory(req, resp){
    console.log(JSON.parse(req.body.chatstory).mensajes);

    resp.send("OK");
}
