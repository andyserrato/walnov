class Utils{
    static fusionarIDS(fuente1, fuente2){
          let hashMapUsuarios = new Map();
          let usuariosID = new Array();

          //Los usuarios pueden estar suscritos a una historia, o pueden seguir a un usuario, hay que fusionar los 2 flujos de id's en 1
          //Mediante un HashMap
          for (let i = 0; i < fuente1.length; i++){
              hashMapUsuarios.set(fuente1[i], 1);
          }

          for (let i = 0; i < fuente2.length; i++){
              hashMapUsuarios.set(fuente2[i], 1);
          }

          for (var [key, value] of hashMapUsuarios) {
              usuariosID.push(key);
          }

          return usuariosID;
    }

    static getFecha(fechaHora){
        //Devuelve la fecha en formato dia/mes/anyo
        return fechaHora.getDate() + "/" + (fechaHora.getMonth() + 1) + "/" + fechaHora.getFullYear();
    }

    static getHora(fechaHora){
        return fechaHora.getHours() + ":" + fechaHora.getMinutes();
    }
}

module.exports.Utils = Utils;
