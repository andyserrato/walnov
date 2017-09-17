import {Usuario} from './usuario.model';
import {RepositorioService} from '../services/repositorio.service';

export class Relato {
  id: string;
  titulo: string;
  autor: string;
  autorNombre: string;
  categoria: any;
  urlImagen: string;
  texto: string;
  opiniones: Array<string>;
  tipo: number;
  lang: string;

  exclusivo: boolean;
  contenido: Array<string>;
  tags: Array<string>;

  usuario: Usuario;
  resumen: string;
  likes: number;
  views: number;
  coments: number;
  fechaCreacion: Date;

  constructor() {
    this.urlImagen = 'http://www.lorempixel.com/1200/1600';
    this.titulo = '';
    this.texto = '';
    this.tags = new Array<string>();
  }


}
