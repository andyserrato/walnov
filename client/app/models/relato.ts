import { Categoria } from './cats';
import { Usuario } from './usuario.model'

export class Relato {
    _id: string;
    titulo: string;
    categoria: Categoria;
    imagen_url: string;
    resumen: string;

    usuario: Usuario;

    likes: number;
    views: number;
    coments: number;
}
