export class ChatstoryMessage{
  character: string;
  text: string;
  image_url: string;
  constructor(c?: string, t?: string, i?:string){
    this.character=c;
    this.text=t;
    this.image_url=i;
  }

}
