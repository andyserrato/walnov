import { Wall } from './wall';
import { Usuario } from './usuario.model';


export class Historia {
  wall: Wall;
  usuario: Usuario;
  likes: number;
  texto: string;
  ranking:number;
  continuaciones: number;

  fechaCreacion: Date;


}
