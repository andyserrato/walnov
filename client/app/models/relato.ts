import { Categoria } from './cats';

export class Relato {
    _id: string;
    titulo: string;
    categoria: Categoria;
    imagen_url: string;
    resumen: string;
    texto: string;
    userName: string;
    userImage: string;
    amigos: Array<string>;
    likes: number;
    views: number;
    coments: number;
}
