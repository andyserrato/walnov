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


router.post("/S3", testS3);
router.post("/testPaypal", testPaypal);
router.get("/testSockets", testSockets)
router.get("/faker", fakerBD);
router.get("/importarUsuarios", importarUsuarios);
module.exports = router;

function testPaypal(req, resp){

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": "visa",
                "number": "4111111111111111",
                "expire_month": "11",
                "expire_year": "2018",
                "cvv2": "874",
                "first_name": "Joe",
                "last_name": "Shopper",
                "billing_address": {
                    "line1": "52 N Main ST",
                    "city": "Johnstown",
                    "state": "OH",
                    "postal_code": "43210",
                    "country_code": "US"
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": "7",
            "currency": "USD",
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
        throw error;
    } else {
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
    (select meta_value from wp_usermeta where meta_key = '_um_verified' and user_id = user.id) as estado,
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
