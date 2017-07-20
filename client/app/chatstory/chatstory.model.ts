import { Categoria } from '../models/cats';
import { ChatstoryMessage } from './crear-chatstory-step-2/chatstory-message/chatstory-message.component';
export class ChatStory{
  titulo: string;
  img: string;
  personajes: Array<string>;
  categoria: Categoria;
  messages: Array<ChatstoryMessage>;
  constructor(t?: string, p?: Array<string>, c?: Categoria, m?: Array<ChatstoryMessage>){
    this.titulo=t;
    this.personajes=p;
    this.categoria=c;
    this.messages=m;
  }

}
