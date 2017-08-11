import { Categoria } from './cats'
export class Wall {
    _id: string;
    titulo: string;
    categoria: number;
    cat: Categoria;
    imagen_url: string;
    resumen: string;

    likes:number;

    participantes: number;
    historias: number;
    visible: boolean = false;

    isRelevante: boolean = false;
}
