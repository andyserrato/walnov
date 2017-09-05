import { Injectable } from '@angular/core';
import { Categoria } from '../models/cats';
import { ChatStory } from '../models/chatstory.model';
import { Relato } from '../models/relato';
import { Wall } from '../models/wall';
import { Continuacion } from '../models/continuacion';
import { Historia } from '../models/historia';
import { Paginator } from '../models/paginador';
import { TranslateService } from '../translate';



@Injectable()
export class RepositorioService{
    //Aqui guardaos el socket una vez conectado
    socket:any;
    //Este array se utilizará para guardar las notificaciones que llegarán por los websockets, o través del inicio de sesión.
    notificaciones:Array<Object> = new Array();
    categoriasHM = new Map<string, Categoria>();
    categoriasAL = new Array();
    chatstories: Array<ChatStory> = new Array<ChatStory>();
    relatos: Array<Relato> = new Array<Relato>();
    walls: Array<Wall> = new Array<Wall>();
    conts: Array<Continuacion> = new Array<Continuacion>();
    hists: Array<Historia> = new Array<Historia>();
    actRec: Array<any> = new Array();

    results: Object// Aquí se guadaran los resultados de busqueda

    PricingDiv = null; //Div que se utiliza para el pricing

    paginadorActividadReciente = null;
    paginadorCardsChatstories = null;
    paginadorChatstoriesBiblioteca = null;
    paginadorCardsRelatos = null;
    paginadorCardsContinuaciones = null;
    paginadorCardsHistorias = null;

    // english: boolean = false;

    constructor(private translate: TranslateService){
        console.log("Contruyendo repositorio");
        this.translate.use('en');



        this.categoriasHM.set(this.translate.instant('categoria_accion'), new Categoria(this.translate.instant('categoria_accion'),'#e65e20'));
        this.categoriasHM.set(this.translate.instant('categoria_aventura'), new Categoria(this.translate.instant('categoria_aventura'),'#29ba6f'));
        this.categoriasHM.set(this.translate.instant('categoria_scifi'), new Categoria(this.translate.instant('categoria_scifi'),'#16d7d3'));
        this.categoriasHM.set(this.translate.instant('categoria_drama'), new Categoria(this.translate.instant('categoria_drama'),'#e15abe'));
        this.categoriasHM.set(this.translate.instant('categoria_romance'), new Categoria(this.translate.instant('categoria_romance'),'#de196d'));
        this.categoriasHM.set(this.translate.instant('categoria_fanfic'), new Categoria(this.translate.instant('categoria_fanfic'),'#df9c00'));
        this.categoriasHM.set(this.translate.instant('categoria_poesia'),new Categoria(this.translate.instant('categoria_poesia'),'#21b3dd'));
        this.categoriasHM.set(this.translate.instant('categoria_humor'), new Categoria(this.translate.instant('categoria_humor'),'#b8764e'));
        this.categoriasHM.set(this.translate.instant('categoria_terror'), new Categoria(this.translate.instant('categoria_terror'),'#4b082e'));
        this.categoriasHM.set(this.translate.instant('categoria_reflexion'), new Categoria(this.translate.instant('categoria_reflexion'),'#2074e6'));

        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_accion'),'#e65e20','rgba(230, 94, 32, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_aventura'),'#29ba6f', 'rgba(41, 186, 111, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_scifi'),'#16d7d3', 'rgba(22, 215, 211, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_drama'),'#e15abe', 'rgba(225, 90, 190, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_romance'),'#de196d', 'rgba(222, 25, 109, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_fanfic'),'#df9c00', 'rgba(223, 156, 0, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_poesia'),'#21b3dd', 'rgba(33, 179, 221, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_humor'),'#b8764e', 'rgba(184, 118, 78, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_terror'),'#4b082e', 'rgba(75, 8, 46, 0.25)'));
        this.categoriasAL.push(new Categoria(this.translate.instant('categoria_reflexion'),'#2074e6', 'rgba(32, 116, 230, 0.25)'));

        this.notificaciones.push("Esto es la primera notificacion");
        this.notificaciones.push("Esto es la segunda notificacion");
        this.notificaciones.push("Esto es la tercera notificacion");
        this.notificaciones.push("Esto es la cuarta notificacion");
    }

    getCategoriaALByName(nombre: string): any {
      return this.categoriasAL.find(categoria => categoria.nombre === nombre);
    }


}
