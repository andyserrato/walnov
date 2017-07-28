import { Categoria } from './cats';

export class Chatstory {
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  imagen_url: string;
  views: number;
  likes: number;


  added: boolean = false; //Se pone a true si se añade el chatstory a mi biblioteca
  selected: boolean = true; //Se usa para dar estilos a un chatstory cuando se selecciona
}
