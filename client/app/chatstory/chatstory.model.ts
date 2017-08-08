import { Categoria } from '../models/cats';
import { ChatstoryMessage } from '../models/chatstory-message';
export class ChatStory {
  id: string;
  titulo: string;
  autor: string;
  autorNombre: string;
  categoria: Categoria;
  urlImagen: string;
  personajes: Array<string>;
  chats: Array<ChatstoryMessage>;
  description: string;
  tipo: string;
  lang: string;
  exclusivo: boolean;
  // TODO agregar estadísticas

  constructor(t?: string, p?: Array<string>, c?: Categoria, m?: Array<ChatstoryMessage>, i?: string, d?: string, e?: boolean){
    this.titulo=t;
    this.personajes=p;
    this.categoria=c;
    this.chats=m;
    this.urlImagen=i;
    this.description=d;
    this.exclusivo=e;
  }

}
