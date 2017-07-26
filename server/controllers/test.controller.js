var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var mysql = require('mysql');
var paypal = require('../SDKS/PayPal-node-SDK-1.7.1');
require('../SDKS/PayPal-node-SDK-1.7.1/lib/configure');

var fs = require('fs');
var GestorNotificaciones = require("../services/notificaciones.service");
var Wall = require('mongoose').model('wall');
var Perfil = require('mongoose').model('perfil');
var Usuario = require('mongoose').model('usuarios');
var Continuacion = require('mongoose').model('continuacion');

router.post("/S3", testS3);
router.post("/testPaypal", testPaypal);
router.get("/testSockets", testSockets)
router.get("/faker", fakerBD);
router.get("/importarUsuarios", importarUsuarios);
router.get("/llenarWall", pruebaWalls);
router.get("/reconstruirArbol", reconstruirArbol);

module.exports = router;

function testPaypal(req, resp){

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": "visa",
                "number": "4020026741465267",
                "expire_month": "08",
                "expire_year": "2022",
                "cvv2": "874",
                "first_name": "Joe",
                "last_name": "Shopper",
                "billing_address": {
                    "line1": "52 N Main ST",
                    "city": "Johnstown",
                    "state": "OH",
                    "postal_code": "46360",
                    "country_code": "ES"
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": "7",
            "currency": "EUR",
            "details": {
                "subtotal": "5",
                "tax": "1",
                "shipping": "1"
            }
        },
        "description": "This is the payment transaction description."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log();
        console.log("Create Payment Response");

        console.log(payment);
    }
});

    resp.send("JUAS");
}

function testS3(req, resp){
     var s3 = new AWS.S3();
     var bucketName = "walnov.imagenes";
     var keyName = "prueba2.png";

     fs.readFile("C:\\Users\\K3rNeL\\Desktop\\Logo-Walnov.png", function(err, data){

          var params = {Bucket: bucketName, Key: keyName, Body: data};

          s3.putObject(params, function(err, data) {
            if (err){
              console.log(err)
            }else{
              console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
              console.log(data);
              resp.send("JUAS JUAS JUAS");
            }
          });
     });
}

function fakerBD(req, resp){
    let nuevoWall = null;
    let tituloWall = "";
    let autorName = "";

    let numItems = 90000;

    for (let i = 0; i < numItems; i++){
        tituloWall = _generateRandomString(20);
        autorName = _generateRandomString(10);
        nuevoWall = new Wall({titulo: tituloWall, autorName:autorName});

        nuevoWall.save(function(err, wall){
            console.log("Wall Insertado");
        });
    }
}

function _generateRandomString(size){
    let conjunto = "abcdefghijklmnñopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < size; i++){
        randomString += conjunto.charAt(Math.random() * conjunto.length);
    }

    return randomString;
}

function testSockets(req, resp){
    console.log(GestorNotificaciones.hashmapUsuarios.size);

    resp.send("OK");
}

function importarUsuarios(req, resp){
    //select user_login, user_pass, display_name, user_registered,user_email from wp_users;

    var con = mysql.createConnection({
      host: "82.223.39.46",
      user: "importacion",
      password: "1315cbnt.1234!"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query('USE walnov');
      console.log("Connected!");
    });

    con.query('USE walnov');

    //query
    let query = `select id , user_login, user_pass, display_name, user_registered,user_email,
    (select meta_value from wp_usermeta where meta_key = 'birth_date' and user_id = user.id) as fechaNacimiento,
    (select meta_value from wp_usermeta where meta_key = 'languages' and user_id = user.id) as lenguajes,
    (select meta_value from wp_usermeta where meta_key = 'country' and user_id = user.id) as pais,
    (select meta_value from wp_usermeta where meta_key = 'gender' and user_id = user.id) as genero,
    (select meta_value from wp_usermeta where meta_key = 'role' and user_id = user.id LIMIT 1) as rol,
    (select meta_value from wp_usermeta where meta
        _key = '_um_verified' and user_id = user.id) as estado,
    (select meta_value from wp_usermeta where meta_key = 'description' and user_id = user.id) as descripcion,
    (select meta_value from wp_usermeta where meta_key = 'first_name' and user_id = user.id LIMIT 1) as nombre,
    (select meta_value from wp_usermeta where meta_key = 'last_name' and user_id = user.id LIMIT 1) as apellidos,
    (select meta_value from wp_usermeta where meta_key = 'profile_photo' and user_id = user.id LIMIT 1) as fotoperfil,
    (select meta_value from wp_usermeta where meta_key = 'cover_photo' and user_id = user.id LIMIT 1) as fotoportada
    from wp_users user;`;

    con.query(query, function (err, result) {
       if (err) throw err;

       for (let i = 0; i < result.length; i++){
           //Creamos el usuario
           //Creamos el perfil
           let sexo = "";
           let usuario = result[i];

           if (usuario.genero != null && result[i].genero.includes("Mujer")){
               sexo = 'M';
           }else{
               sexo = 'H';
           }

           let estado = 0;

           if (usuario.estado == "verified"){
               estado = 1;
           }

           let nuevoPerfil = new Perfil({
               nombre: usuario.nombre,
               apellidos: usuario.apellidos,
               sexo: usuario.sexo,
               foto_portada: usuario.fotoportada,
               foto_perfil: usuario.fotoperfil,
               email: usuario.user_email,
               descripcion: usuario.descripcion
           });

           let nuevoUsuario = new Usuario({
               perfil: nuevoPerfil,
               estado: estado,
               login: usuario.user_login,
               password: usuario.user_pass,
               name: usuario.display_names,
               necesitaRevalidarPassword: true
           });

           nuevoUsuario.save(function (err, nuevoUsuario){
            console.log("Usuario añadido correctamente;");
           });

       }

    });

    resp.send("JUAS");

}

function pruebaWalls(req, resp){
    let nuevoWall = new Wall({
        titulo: "Esto es un wall para probar el rendimiento",
        categoria: "Accion",
        urlImagen: "Ninguna",
        cuerpoWall: "Esto es el cuerpo del wall"
    });

    //resp.send(nuevoWall);

    nuevoWall.save(function(err, wall){
        console.log(wall);

        //Metemos el primer nodo, que es la historia
        let nuevaContinuacion = new Continuacion({
            idWall: wall._id,
            padre: null,
            contenido: "Esto es la hiistoria!!!"
        });

        nuevaContinuacion.save(function(err, historia){
            let idHistoria = historia._id;
            let padre = idHistoria;

            _insertarContinuacion(wall._id, idHistoria, padre, 0, resp);
        })

    });
}

function _insertarContinuacion(idWall, idHistoria, idPadre, numNodo, resp){
    let promise = new Promise(resolve => {
        let nuevaContinuacion = new Continuacion({
            idWall: idWall,
            padre: idPadre,
            idHistoria: idHistoria,
            contenido: "Continuacion: " + numNodo
        });

        nuevaContinuacion.save(function(err, continuacion){
            resolve(continuacion);
        })
    }).then(continuacion => {
        //console.log(numNodo);
        if (numNodo < 10000){
            _insertarContinuacion(continuacion.idWall, continuacion.idHistoria, continuacion._id, numNodo + 1, resp);
        }else
            resp.send("OK");

    });

    return promise;
}

let cache = new Array();
let arbol = {};

function reconstruirArbol(req, resp){

    //Buscamos el wall
    Wall.findById("59613e5ae9bba830086efca7", function(err, wall){
        let nodo = {
            obj: wall,
            hijos : new Array()
        }

        arbol = nodo;

        Continuacion.find({idWall: "59613e5ae9bba830086efca7"},{}, {sort:{_id: 1}}, function(err, continuaciones){
            //Buscamos los inicios de historia
            for (let i = 0; i < continuaciones.length; i++ ){
                if (continuaciones[i].padre == null){
                    let nuevoNodo = {
                        obj: continuaciones[i],
                        hijos: new Array()
                    };

                    arbol.hijos.push(nuevoNodo);
                }
            }

            let inicio = new Date();
            console.log("Iniciando!!!");
            for (let i = 0; i < 1950; i++){
                if (continuaciones[i].padre != null){
                    let nuevoNodo = {
                        obj: continuaciones[i],
                        hijos: new Array()
                    };

                    situarNodo(nuevoNodo);
                }
            }
            let fin = new Date();
            console.log("Tiempo:" + (fin - inicio));


            resp.send(arbol);
        });


    });


}

function situarNodo(nodoASituar){
    let cola = new Array();
    let nodoActual = null;
    let encontrado = false;
    //console.log();
    //console.log("Buscando: " + nodoASituar.obj.padre);
    //Miramos en la cache
    for (let i = cache.length - 1; i >= 0 && !encontrado; i--){
        if (cache[i].obj._id.toString() == nodoASituar.obj.padre.toString()){
            encontrado = true;
            //console.log("encontrado cache");
            cache[i].hijos.push(nodoASituar);

            if (cache.length == 20){
                 cache.pop();
            }

            cache.push(nodoASituar);
        }
    }

    if (!encontrado){
        //Lo correcto sería recorrer todos los hijos
        cola.unshift(arbol.hijos[0]);

        //console.log(cola.length);

        while (cola.length > 0 && encontrado == false){
            //Procesamos el nodo
            nodo = cola.shift();
            //console.log(nodo);

            //Metemos todos sus hijos
            for (let i = 0; i < nodo.hijos.length; i++){
                cola.unshift(nodo.hijos[i]);
            }

            if (nodo.obj._id.toString() == nodoASituar.obj.padre.toString()){
                encontrado = true;

                //console.log("Situado: " + nodoASituar.obj._id.toString());
                nodo.hijos.push(nodoASituar);
                //Situamos el nodo en la cache de nodos
                if (cache.length == 20){
                     cache.pop();
                }

                cache.push(nodoASituar);
                //console.log(cache);

            }
        }
    }else{
        //console.log("no entro!!!");
    }


}
