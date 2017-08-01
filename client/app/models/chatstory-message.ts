export class ChatstoryMessage{
  character: string;
  text: string;
  image_url: string;
  delay: boolean;
  constructor(c?: string, t?: string, i?:string, d?:boolean){
    this.character=c;
    this.text=t;
    this.image_url=i;
    this.delay=d;
  }

}
