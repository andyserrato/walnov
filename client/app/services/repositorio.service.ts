import { Injectable } from '@angular/core';
import { Categoria } from '../models/cats';
import { Chatstory } from '../models/chatstory.model';

@Injectable()
export class RepositorioService{
    //Aqui guardaos el socket una vez conectado
    socket:any;
    //Este array se utilizará para guardar las notificaciones que llegarán por los websockets, o través del inicio de sesión.
    notificaciones:Array<Object> = new Array();
    categorias: Array<Categoria> = new Array<Categoria>();
    chatstories: Array<Chatstory> = new Array<Chatstory>();

    constructor(){
        console.log("Contruyendo repositorio");

        this.categorias.push(new Categoria('Acción','#e65e20'));
        this.categorias.push(new Categoria('Aventura','#29ba6f'));
        this.categorias.push(new Categoria('SCI-FI','#16d7d3'));
        this.categorias.push(new Categoria('Drama','#e15abe'));
        this.categorias.push(new Categoria('Romance','#de196d'));
        this.categorias.push(new Categoria('FanFiction','#df9c00'));
        this.categorias.push(new Categoria('Poesía','#21b3dd'));
        this.categorias.push(new Categoria('Humor','#b8764e'));
        this.categorias.push(new Categoria('Terror','#4b082e'));
        this.categorias.push(new Categoria('Reflexión','#2074e6'));

        this.notificaciones.push("Esto es la primera notificacion");
        this.notificaciones.push("Esto es la segunda notificacion");
        this.notificaciones.push("Esto es la tercera notificacion");
        this.notificaciones.push("Esto es la cuarta notificacion");
    }



}
