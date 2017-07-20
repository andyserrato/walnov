import { Component, Input} from '@angular/core';

@Component({
  selector: 'miniatura-wall',
  template: `
    <div class="miniatura-wall" (mouseover)="this.seleccionado = true" (mouseleave)="this.seleccionado = false">
        <div class="wrapper-header">
            <div class="header" [style.background]="getImagen()" [style.height.px]="getHeight()">
                <div class="header-filtro" [style.height.px]="getHeight()"></div>
                <div class="header-filtro2" [style.height.px]="getHeight()"></div>
            </div>

            <div class="titulo">Las increíbles historias de Nurum Itzar</div>
            <div class="categoria">{{wall.categoria.toUpperCase()}}</div>
            <div [style.display]="isVisible()" class="d-flex wrapper-imagen-autor">
                <div><img [style.display]="isVisible()" class="imagen-autor" src="https://lorempixel.com/757/200/"/></div>
                <div [style.display]="isVisible()" class="nombre-autor">Amorentrelineas</div>
            </div>

            <div [style.display]="isVisible()" class="imagen_editar"><img height="80" width="80" src="assets/images/Wall_icon_big.svg"/></div>
        </div>

        <div class="texto">
            {{wall.texto}}
        </div>

        <div class="d-flex justify-content-center">
            <div class="separador" [style.border-top]="'dashed 1px $cat-2'">

            </div>
        </div>

        <div class="d-flex justify-content-center">
            <div *ngIf="!seleccionado" class="numero-historias">
                10 historias
            </div>

            <div *ngIf="seleccionado" class="numero-historias">
                236 participantes
            </div>
        </div>
    </div>

  `,
  styleUrls: ['./miniatura-wall.component.scss']
})

export class MiniaturaWall {

     @Input() wall;
     seleccionado = false;

      constructor() {

      }

      ngOnInit() {

      }

      isVisible(){
          if (this.seleccionado){
              return "block";
          }else{
              return "none";
          }
      }

      getHeight(){
          if (this.seleccionado){
              return "222";
          }else{
              return "80";
          }
      }

      getImagen(){
          return "url(" + this.wall.urlImagen + ")";
          //return "";
      }
}
