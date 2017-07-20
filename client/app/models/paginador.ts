export class Paginator {
  paginador: Array<Object> = new Array();
  indice: number;

  constructor(private items: Array<Object>, private container, private limite:number) {
    console.log(items);
    this.indice = limite;

    for(let i=0; i<limite; i++) {
      this.paginador.push(items[i]);
    }
    container.nativeElement.addEventListener("scroll", () => {
      let height = this.container.nativeElement.scrollHeight - 500;

    let porcentaje = (this.container.nativeElement.scrollTop * 100) / height;

    if(porcentaje === 100) {
      this.paginarDelante();
      console.log("hola");
      console.log(this.paginador);
    }
    else if (porcentaje === 0) { this.paginarDetras();}

    console.log(porcentaje);
    });
    //console.log(this.container);


  };

  paginarDelante () {
    if(this.indice < this.items.length) {
      this.paginador.shift();
      this.paginador.push(this.items[this.indice]);
      this.indice++;
    }


  }

 paginarDetras () {
   if((this.indice - this.limite) > 0) {
     this.indice--;
     this.paginador.unshift(this.items[this.indice-this.limite]);
     this.paginador = this.paginador.splice(0, this.limite);

     this.container.nativeElement.scrollTop = 80;
   }

 }

 scroll (){
   let height = this.container.nativeElement.scrollHeight - 200;

   let porcentaje = (this.container.nativeElement.scrollTop * 100) / height;

   if(porcentaje === 100) { this.paginarDelante(); }
   else if (porcentaje === 0) { this.paginarDetras(); }
 }

}
