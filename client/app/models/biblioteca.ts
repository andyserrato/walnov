import { Usuario } from './usuario.model';
import { ChatStory } from './chatstory.model';
import { Relato } from './relato.model';
import { Wall } from './wall';

export class Biblioteca {
  usuarios: Array<Usuario>;
  walls: Array<Wall>;
  relatos: Array<Relato>;
  chatstories: Array<ChatStory>;
}
