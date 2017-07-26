import { Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'info-item-autor',
  template: `
    <div id="card-info-autor">

        <div id="info-item">
            Info del Wall
        </div>

        <div class="separador">

        </div>

        <div  class="flex justify-content-center">
            <div id="categoria">
                SCI-FI
            </div>
        </div>

        <div style="margin-top: 20px;" class="texto">
            89 participantes
        </div>

        <div class="texto">
            10 historias
        </div>

        <div class="texto">
            12967 visualizaciones
        </div>

        <div class="separador">

        </div>

        <div id="info-item">
            Autor
        </div>

        <div id="info-autor">
            <img src="https://lorempixel.com/757/200/" id="foto_autor"/>

            <div id="caja_autor">
                <div id="nombre_autor">Amorentrelineas</div>
                <div style="margin-top: 6px" class="texto">23 Walls</div>
                <div class="texto">4 Chatstories</div>
                <div class="texto">8 Relatos cortos</div>
                <div id="boton_seguir">Seguir</div>

            </div>
        </div>

    </div>
  `,
  styleUrls: ['./info-item-autor.component.scss']
})

export class InfoItemAutor {

      constructor() {

      }

      ngOnInit() {

      }

}
