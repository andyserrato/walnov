import { Categoria } from '../models/cats';
import { ChatstoryMessage } from '../models/chatstory-message';
export class ChatStory{
  titulo: string;
  img: string;
  personajes: Array<string>;
  categoria: Categoria;
  messages: Array<ChatstoryMessage>;
  description: string;
  exclusivo: boolean;
  constructor(t?: string, p?: Array<string>, c?: Categoria, m?: Array<ChatstoryMessage>, i?: string, d?: string, e?: boolean){
    this.titulo=t;
    this.personajes=p;
    this.categoria=c;
    this.messages=m;
    this.img=i;
    this.description=d;
    this.exclusivo=e;
  }

}
