export class Paginator {
 paginador: Array<Object> = new Array();
 indice: number;
 final: boolean;
 inicio: boolean;
 paginar = true;
 vecesScroll = 0;
 container: any;

  constructor(private items: Array<Object>, private c, private limite:number, private cargar:number) {
    this.indice = limite;
    this.rellenar(items);
    this.container = c;
    this.container.nativeElement.addEventListener("scroll", this.scroll.bind(this));
    // console.log("inicializando");
    this.final = false;
    this.inicio = true;
 }

 addItem(newItem) {
   if (newItem) {
     let elementos = this.paginador;
     if(elementos.indexOf(newItem)<0) {
       this.paginador.push(newItem);
     }
   }
 }

 paginarDelante () {
     if(this.indice <0) { this.indice = 0; }

     for(let i = 0; i<this.cargar; i++) {
       if(this.indice < this.items.length) {
         this.paginador.shift();
         this.paginador.push(this.items[this.indice]);
         this.indice++;
       }else if(!this.final){
         this.final=true;
         console.log('final del paginador, puedes cargar mas contenido');
       }
     }
  }

 paginarDetras () {
   let posicion = this.cargar;
   let avanza = this.indice - this.limite - this.cargar;
   if(avanza<0) { avanza=0;}

   for(let i=0; i<this.cargar; i++) {
     if((this.indice - this.limite) > 0) {
       this.paginador[posicion] = this.paginador[i];
       this.paginador[i] = this.items[avanza];
      //  console.log(this.indice-this.limite);
       posicion++;
       avanza++;
       this.indice--;
       this.container.nativeElement.scrollTop = 1;
     }
   }
  //  console.log(this.paginador);
}

scroll (){
  let height = this.container.nativeElement.scrollHeight - (this.container.nativeElement.clientHeight);

  //console.log(this.container.nativeElement.clientHeight);
  //console.log(this.container.nativeElement.scrollHeight);
  let porcentaje = (this.container.nativeElement.scrollTop * 100) / height;
  this.inicio = porcentaje === 0 ? true : false;
  // console.log(porcentaje);
  //console.log(this.paginar);

  if (this.vecesScroll == 4){
      this.paginar = true;
  }

  this.vecesScroll++;

  if (this.paginar){
      if(porcentaje >= 100) {
        this.paginar = false;
        this.paginarDelante();
        this.vecesScroll = 0;
      } else if (porcentaje === 0 && this.paginar == true) {
        console.log("pagino hacia detras");
        this.paginar = false;
        this.paginarDetras();
        this.vecesScroll = 0;
      }
  }

}

rellenar(items) {
  this.indice = this.limite;
  this.items = items;
  this.paginador = [];

  for(let i=0; (i<this.limite) && (i<items.length); i++) {
    this.paginador.push(items[i]);
  }

}


scrollTop() {
  this.container.nativeElement.scrollTop=0;
  while(this.indice>this.limite) {
    this.paginarDetras();
    this.container.nativeElement.scrollTop = 0;
  }
}

}
