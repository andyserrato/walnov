import { Injectable } from '@angular/core';
import { Categoria } from '../models/cats';
import { Chatstory } from '../models/chatstory.model';
import { Relato } from '../models/relato';
import { Paginator } from '../models/paginador';


@Injectable()
export class RepositorioService{
    //Aqui guardaos el socket una vez conectado
    socket:any;
    //Este array se utilizará para guardar las notificaciones que llegarán por los websockets, o través del inicio de sesión.
    notificaciones:Array<Object> = new Array();
    categoriasHM = new Map<string, Categoria>();
    categoriasAL = new Array();
    chatstories: Array<Chatstory> = new Array<Chatstory>();
    relatos: Array<Relato> = new Array<Relato>();

    paginadorCardsChatstories = null;
    paginadorChatstoriesBiblioteca = null;
    paginadorCardsRelatos = null;

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

        this.categoriasAL.push(new Categoria('Acción','rgb(230, 94, 32)','rgba(230, 94, 32, 0.25)'));
        this.categoriasAL.push(new Categoria('Aventura','rgb(41, 186, 111)', 'rgba(41, 186, 111, 0.25)'));
        this.categoriasAL.push(new Categoria('SCI-FI','rgb(22, 215, 211)', 'rgba(22, 215, 211, 0.25)'));
        this.categoriasAL.push(new Categoria('Drama','rgb(225, 90, 190)', 'rgba(225, 90, 190, 0.25)'));
        this.categoriasAL.push(new Categoria('Romance','rgb(222, 25, 109)', 'rgba(222, 25, 109, 0.25)'));
        this.categoriasAL.push(new Categoria('FanFiction','rgb(223, 156, 0)', 'rgba(223, 156, 0, 0.25)'));
        this.categoriasAL.push(new Categoria('Poesía','rgb(33, 179, 221)', 'rgba(33, 179, 221, 0.25)'));
        this.categoriasAL.push(new Categoria('Humor','rgb(184, 118, 78)', 'rgba(184, 118, 78, 0.25)'));
        this.categoriasAL.push(new Categoria('Terror','rgb(75, 8, 46)', 'rgba(75, 8, 46, 0.25)'));
        this.categoriasAL.push(new Categoria('Reflexión','rgb(32, 116, 230)', 'rgba(32, 116, 230, 0.25)'));



        this.notificaciones.push("Esto es la primera notificacion");
        this.notificaciones.push("Esto es la segunda notificacion");
        this.notificaciones.push("Esto es la tercera notificacion");
        this.notificaciones.push("Esto es la cuarta notificacion");
    }



}
