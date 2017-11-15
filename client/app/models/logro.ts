import { Wall } from './wall';
import { Relato } from './relato.model';
import { ChatStory } from './chatstory.model';
import { Historia } from './historia';
import { Continuacion } from './continuacion';

export class Logro {
  wall?: Wall;
  relato?: Relato;
  chatstory?: ChatStory;
  historia?: Historia;
  continuacion?: Continuacion;

}
