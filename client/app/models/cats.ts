export class Categoria {
  nombre: string;
  color: string;
  opacidad: string;
  selected: boolean = false; //Se pone a true si le das click a una categoría para filtrar

  public static Accion = new Categoria('Acción','#e65e20');
  public static Aventura = new Categoria('Aventura','#29ba6f');
  public static Sfi = new Categoria('Sci-Fi','#16d7d3');
  public static Drama = new Categoria('Drama','#e15abe');
  public static Romance = new Categoria('Romance','#de196d');
  public static Fan = new Categoria('Fanfiction','#df9c00');
  public static Poesia = new Categoria('Poesía','#21b3dd');
  public static Humor = new Categoria('Humor','#b8764e');
  public static Terror = new Categoria('Terror','#4b082e');
  public static Reflexion = new Categoria('Reflexión','#2074e6');

  public static Categorias = [
    Categoria.Accion,
    Categoria.Aventura,
    Categoria.Sfi,
    Categoria.Drama,
    Categoria.Romance,
    Categoria.Fan,
    Categoria.Poesia,
    Categoria.Humor,
    Categoria.Terror,
    Categoria.Reflexion
  ];
  //categorias: Array<Categoria> = new Array<Categoria>();

  constructor(n: string, c: string, o?:string){
    this.nombre=n;
    this.color=c;
    this.opacidad = o;
  }

  //categorias: Array<Categoria> = new Array<Categoria>();

  //public Accion = new Categoria('Acción','#e65e20');


}
