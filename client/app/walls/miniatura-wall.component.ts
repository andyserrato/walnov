import { Component, Input} from '@angular/core';
import { RepositorioService } from '../services/repositorio.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'miniatura-wall',
  template: `
    <div class="miniatura-wall" (mouseover)="this.seleccionado = true" (mouseleave)="this.seleccionado = false">
        <div class="wrapper-header">
            <div class="header" [style.background]="getImagen()" [style.height.px]="getHeight()">
                <div class="header-filtro" [style.height.px]="getHeight()"></div>
                <div class="header-filtro2" [style.background-image]="getFiltro()" [style.height.px]="getHeight()"></div>
            </div>

            <div class="titulo">Las increíbles historias de Nurum Itzar</div>
            <div class="categoria" [style.background-color]="getColor()" >{{wall.categoria.toUpperCase()}}</div>
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
            <div class="separador" [style.border-top]="getBorderColor()">

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

      constructor(private repositorio:RepositorioService, private sanitizer:DomSanitizer) {

      }

      ngOnInit() {

      }

      getBorderColor(){
          return "dashed 1px " + this.getColor();
      }

      getColor(){
          return this.repositorio.categoriasHM.get(this.wall.categoria).color;
      }

      isVisible(){
          if (this.seleccionado){
              return "block";
          }else{
              return "none";
          }
      }

      getFiltro(){
          return this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, rgba(41, 186, 111, 0), " + this.repositorio.categoriasHM.get(this.wall.categoria).color + ")");
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
