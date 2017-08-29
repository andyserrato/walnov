import { Categoria } from './cats';
import { Usuario } from './usuario.model';

export class Wall {
    _id: string;
    titulo: string;
    categoria: number;
    cat: Categoria;
    imagen_url: string;
    resumen: string;
    texto: string;
    usuario: Usuario;

    likes:number;
    tags: Array<string>;
    participantes: number;
    historias: number;
    visible: boolean = false;

    isRelevante: boolean = false;
    fechaCreacion: Date;

}
