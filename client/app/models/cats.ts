export class Categoria {
  nombre: string;
  color: string;

  public static Accion = new Categoria('ACCIÓN','#e65e20');
  public static Aventura = new Categoria('AVENTURA','#29ba6f');
  public static Sfi = new Categoria('SCI-FI','#16d7d3');
  public static Drama = new Categoria('DRAMA','#e15abe');
  public static Romance = new Categoria('ROMANCE','#de196d');
  public static Fan = new Categoria('FANFICTION','#df9c00');
  public static Poesia = new Categoria('POESIA','#21b3dd');
  public static Humor = new Categoria('HUMOR','#b8764e');
  public static Terror = new Categoria('TERROR','#4b082e');
  public static Reflexion = new Categoria('REFLEXIÓN','#2074e6');
  //categorias: Array<Categoria> = new Array<Categoria>();

  constructor(n: string, c: string){
    this.nombre=n;
    this.color=c;
  }

  //categorias: Array<Categoria> = new Array<Categoria>();

  //public Accion = new Categoria('Acción','#e65e20');


}
