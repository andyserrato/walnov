export class Image{
  selected: boolean;
  url: string;
  constructor(url:string, sel: boolean){
    this.url=url;
    this.selected=sel;
  }
}
