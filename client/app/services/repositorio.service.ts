import { Injectable } from '@angular/core';

@Injectable()
export class RepositorioService{
    //Aqui guardaos el socket una vez conectado
    socket:any;
    //Este array se utilizará para guardar las notificaciones que llegarán por los websockets, o través del inicio de sesión.
    notificaciones:Array<Object> = new Array();

    constructor(){
        console.log("Contruyendo repositorio");

        this.notificaciones.push("Esto es la primera notificacion");
        this.notificaciones.push("Esto es la segunda notificacion");
        this.notificaciones.push("Esto es la tercera notificacion");
        this.notificaciones.push("Esto es la cuarta notificacion");
    }

}
