import { Categoria } from './cats';

export class Relato {
    _id: string;
    titulo: string;
    categoria: Categoria;
    imagen_url: string;
    resumen: string;

    userName: string;
    userImage: string;

    likes: number;
    views: number;
    coments: number;
}
