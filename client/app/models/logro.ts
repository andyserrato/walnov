import { Wall } from './wall';
import { Relato } from './relato';
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
