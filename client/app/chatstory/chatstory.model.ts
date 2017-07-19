import { Categoria } from '../models/cats';

export class ChatStory{
  titulo: string;
  personajes: Array<string>;
  categoria: Categoria;
  constructor(t?: string, p?: Array<string>, c?: Categoria){
    this.titulo=t;
    this.personajes=p;
    this.categoria=c;
  }

}
