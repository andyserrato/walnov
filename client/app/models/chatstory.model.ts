import { Categoria } from './cats';
import { ChatstoryMessage } from './chatstory-message';
import { Usuario } from './usuario.model';


export class ChatStory {
  id: string;
  titulo: string;
  autor: string;
  autorNombre: string;
  usuario: Usuario; // Esto debería reemplazar al autor
  categoria: any;
  urlImagen: string;
  personajes: Array<string>;
  chats: Array<ChatstoryMessage>;
  descripcion: string;
  tipo: number;
  lang: string;
  exclusivo: boolean;
  views: number;
  likes: number;
  fechaCreacion: Date;
  added = false; // Se pone a true si se añade el chatstory a mi biblioteca
  selected = true; // Se usa para dar estilos a un chatstory cuando se selecciona

  constructor(t?: string, p?: Array<string>, c?: Categoria, m?: Array<ChatstoryMessage>, i?: string, d?: string, e?: boolean) {
    this.titulo = t;
    this.personajes = p;
    this.categoria = c;
    this.chats = m;
    this.urlImagen = i;
    this.descripcion = d;
    this.exclusivo = e;
  }
}
