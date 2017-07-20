import { Injectable } from '@angular/core';
import { Categoria } from '../models/cats';

@Injectable()
export class RepositorioService{
    //Aqui guardaos el socket una vez conectado
    socket:any;
    //Este array se utilizará para guardar las notificaciones que llegarán por los websockets, o través del inicio de sesión.
    notificaciones:Array<Object> = new Array();
    categoriasHM = new Map<string, Categoria>();
    categoriasAL = new Array();
    constructor(){
        console.log("Contruyendo repositorio");
        
        this.categoriasHM.set('Acción', new Categoria('Acción','#e65e20'));
        this.categoriasHM.set('Aventura', new Categoria('Aventura','#29ba6f'));
        this.categoriasHM.set('SCI-FI', new Categoria('SCI-FI','#16d7d3'));
        this.categoriasHM.set('Drama', new Categoria('Drama','#e15abe'));
        this.categoriasHM.set('Romance', new Categoria('Romance','#de196d'));
        this.categoriasHM.set('FanFiction', new Categoria('FanFiction','#df9c00'));
        this.categoriasHM.set('Poesía',new Categoria('Poesía','#21b3dd'));
        this.categoriasHM.set('Humor', new Categoria('Humor','#b8764e'));
        this.categoriasHM.set('Terror', new Categoria('Terror','#4b082e'));
        this.categoriasHM.set('Reflexión', new Categoria('Reflexión','#2074e6'));

        this.categoriasAL.push(new Categoria('Acción','#e65e20'));
        this.categoriasAL.push(new Categoria('Aventura','#29ba6f'));
        this.categoriasAL.push(new Categoria('SCI-FI','#16d7d3'));
        this.categoriasAL.push(new Categoria('Drama','#e15abe'));
        this.categoriasAL.push(new Categoria('Romance','#de196d'));
        this.categoriasAL.push(new Categoria('FanFiction','#df9c00'));
        this.categoriasAL.push(new Categoria('Poesía','#21b3dd'));
        this.categoriasAL.push(new Categoria('Humor','#b8764e'));
        this.categoriasAL.push(new Categoria('Terror','#4b082e'));
        this.categoriasAL.push(new Categoria('Reflexión','#2074e6'));



        this.notificaciones.push("Esto es la primera notificacion");
        this.notificaciones.push("Esto es la segunda notificacion");
        this.notificaciones.push("Esto es la tercera notificacion");
        this.notificaciones.push("Esto es la cuarta notificacion");
    }

}
