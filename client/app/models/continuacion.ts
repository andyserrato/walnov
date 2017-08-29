import { Wall } from './wall'
import { Usuario } from './usuario.model';

export class Continuacion {
  wall: Wall;
  usuario: Usuario;
  likes: number;
  texto: string;

  fechaCreacion: Date;

}
