export class ChatstoryMessage{
  personaje: string;
  chat: string;
  urlImagen: string;
  delay: boolean;
  constructor(c?: string, t?: string, i?:string, d?:boolean){
    this.personaje=c;
    this.chat=t;
    this.urlImagen=i;
    this.delay=d;
  }

}
