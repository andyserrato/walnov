class Constantes {
  static get Wall() {
    return Wall;
  }

  static get Tipo() {
    return Tipo;
  }

  static get Historia() {
    return Historia;
  }

  static get Notificacion() {
    return Notificacion;
  }

  static get Usuario() {
    return Usuario;
  }

  static get Categorias() {
    return Categorias;
  }

  static get Idiomas() {
    return Idiomas;
  }

  static get Mensajes() {
    return Mensajes;
  }

  static get ApiVersion() {
    return ApiVersion;
  }

}

class ApiVersion {
  static get API_VERSION() {
    return 'apiv1';
  }
}

class Wall {
  static get PUBLICADO() {
    return 1;
  }

  static get BORRADOR() {
    return 2;
  }

  static get PUBLICO() {
    return 0;
  }

  static get PRIVADO() {
    return 1;
  }

  static get EXCLUSIVO() {
    return 2;
  }
}

class Tipo {
  static get PUBLICADO() {
    return 0;
  }

  static get BORRADOR() {
    return 1;
  }

  static get PUBLICO() {
    return 2;
  }

  static get PRIVADO() {
    return 3;
  }

  static get EXCLUSIVO() {
    return 3;
  }
}

class Historia {
  static get TIPO_1() {
    return 10;
  }
}

class Notificacion {
  static get NUEVO_WALL() {
    return 1;
  }

  static get NUEVA_HISTORIA() {
    return 2;
  }

  static get CONTINUACION_HISTORIA() {
    return 3;
  }

  static get NUEVO_RELATO() {
    return 4;
  }

  static get NUEVO_CHAT_STORY() {
    return 5;
  }

  static get NUEVA_OPINION_RELATO() {
    return 6;
  }

  static get NUEVA_OPINION_CHAT_STORY() {
    return 7;
  }

  static get NUEVO_SEGUIDOR() {
    return 8;
  }
}

class Usuario {
  static get ESTADO_SIN_VERIFICAR() {
    return 0;
  }

  static get ESTADO_VERIFICADO() {
    return 1;
  }

  static get TIPO_NORMAL() {
    return 0;
  }

  static get TIPO_PARTNER() {
    return 1;
  }

  static get TIPO_ADMIN() {
    return 1;
  }
}

class Categorias {
  static get CATEGORIAS() {
    return ['Acción', 'Action', 'Aventura', 'Adventure', 'Ciencia-Ficción', 'Sci-Fi', 'Drama', 'Drama', 'Romance', 'Romance', 'FanFiction', 'FanFiction', 'Poesía', 'Poetry', 'Humor', 'Humor', 'Terror', 'Terror', 'Reflexión', 'Thought']
  }
}
class Idiomas {
  static get IDIOMAS() {
    return [ 'es', 'en'];
  }
}

class Mensajes {
  static get MENSAJES() {
    return {
      es : {
        error : "Ha ocurrido un error",
        creado: "Ha creado un ChatStory",
        usuarioYaSeEncuentra: "Nombre de usuario ya registrado",
        emailYaSeEncuentra: "El email ya se encuentra registrado",
        follow: "Campos userId y userIdToFollow requeridos",
        unFollow: "Campos userId y userIdToUnFollow requeridos",
        userNotFound: "Usuario no encontrado",
        errorSavingUser: "Error actualizando usuario",
        followMessage: "Ha conectado contigo",
        alreadyFollowing: "Ya sigue al usuario",
        notFollowing: "Usuario no seguido"
      },
      en : {
        error: "Bad Request",
        created: "Created a ChaStory",
        usuarioYaSeEncuentra: "User name already taken",
        emailYaSeEncuentra: "Email already taken",
        follow: "userId and userIdToFollow are required",
        unFollow: "userId and userIdToUnFollow are required",
        userNotFound: "User not found",
        errorSavingUser: "Error updating user",
        followMessage: "Has connected with you",
        notFollowing: "User not followed"
      }
    };
  }
}

module.exports = Constantes;
