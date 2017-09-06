export class Paginator {
 paginador: Array<Object> = new Array();
 indice: number;
 final: boolean;

  constructor(private items: Array<Object>, private container, private limite:number, private cargar:number) {
    this.indice = limite;
    this.rellenar(items);
    container.nativeElement.addEventListener("scroll", this.scroll.bind(this));
    // console.log("inicializando");
    this.final = false;

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
  //console.log(porcentaje);
  if(porcentaje >= 100) {
    this.paginarDelante();
  } else if (porcentaje === 0) {
    this.paginarDetras();
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

}
