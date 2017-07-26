import { Component} from '@angular/core';

@Component({
  selector: 'visor-wall',
  template: `

  <div class="modal_publicacion">
    <div style="display:flex">
        <div class="titulo"><span style="margin-left: 20px;">Escribe una Continuacion alternativa para:</span></div>
        <div class="explicacion">Una continuación alternativa es bla bla bla bla Una continuación alternativa es bla bla bla bla Una continuación alternativa es bla bla bla bla</div>
    </div>

    <div class="texto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus

t sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus

    </div>

    <div class="flex">
        <div id="autor"><img class="foto_autor" src="https://lorempixel.com/757/200/"/>&nbsp;&nbsp;Estas publicando como Gustavo Manuel</div>
        <div id="numero_caracteres" class="flex bottom_reverse">0/750</div>
    </div>

    <div id="caja_entrada_texto">
        <textarea id="entrada_texto"></textarea>
    </div>

    <div style="display: flex; flex-direction: row-reverse; margin-right: 20px; margin-top: 16px;">
        <div class="boton_publicar">Publicar</div>
        <div class="boton_cancelar">Cancelar</div>
    </div>

  </div>

    <div class="row">
        <div class="col-lg-12 header">
            <div class="row" style="margin-top: 24.4px">
                <div class=" col-lg-7 titulo" >Titulo del wall</div>
                <div class=" col-lg-3 padding5 text-right"><span class="boton_compartir"><i class="fa fa-share-alt fa-lg" aria-hidden="true"></i></span></div>
                <div class=" col-lg-2 nopadding text-left" style="color: white;"><span class="boton_compartir"><i class="fa fa-heart-o fa-lg" aria-hidden="true"></i></span>&nbsp;+100K</div>
            </div>

            <div class="row">
                <div class="col-lg-12 tipo_wall">Wall público&nbsp; <i class="fa fa-unlock" aria-hidden="true"></i></div>
            </div>

            <div class="col-lg-12 literal_introduccion_wall">
                Introducción del Wall
            </div>

            <div class="col-lg-12 introduccion_wall">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus, ac lacinia odio suscipit.

            </div>

            <div class="row">
                <div class="col-lg-12 barra_historias">
                    <div class="row">
                        <div class="col-lg-3" id="historia_mas_valorada">Historia más valorada</div>
                        <div class="col-lg-5" id="listado_historias">Listado de historias</div>
                        <div class="col-lg-4" style="position:relative;">
                            <div id="boton_nuevo_inicio_historia"></div>
                            <div id="literal_nuevo_inicio_historia">Nuevo inicio de historia</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12" id="contenedor_continuaciones">

        <div id="inicio_historia">
            <div clas="row">
                <div class="col-lg-12">
                    <div class="flex">
                        <div> <img class="foto_autor" src="https://lorempixel.com/757/200/"/> </div>
                        <div class="literal_inicio_de_historia_por"> Inicio de historia por </div>
                        <div class="autor"> Gustavo manuel </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 texto negrita">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus, ac lacinia odio suscipit.

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis
                </div>
            </div>


            <div id="barra_compartir_inicio_historia" >
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <i class="fa fa-share-alt margin_iconos_barra_inferior" aria-hidden="true"></i>
            </div>

        </div>



        <div class="continuacion">
            <div clas="row">
                <div class="col-lg-12">
                    <div class="flex">
                        <div> <img class="foto_autor" src="https://lorempixel.com/757/200/"/> </div>
                        <div class="literal_continuacion_alternativa"> Continuacion escrita por </div>
                        <div class="autor"> Gustavo manuel </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 texto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus

                </div>
            </div>

            <div class="barra_compartir_continuacion_historia" >
                <div class="row nopadding">
                    <div class="col-lg-6">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <i class="fa fa-share-alt margin_iconos_barra_inferior" aria-hidden="true"></i>
                    </div>

                    <div class="col-lg-3 text-right numero_alternativas">
                        8 alternativas
                    </div>

                    <div class="col-lg-3 nopadding crear_alternativa">
                        Crear alternativa
                    </div>
                </div>
            </div>


        </div>

        <div class="continuacion">
            <div clas="row">
                <div class="col-lg-12">
                    <div class="flex">
                        <div> <img class="foto_autor" src="https://lorempixel.com/757/200/"/> </div>
                        <div class="literal_continuacion_alternativa"> Continuacion escrita por </div>
                        <div class="autor"> Gustavo manuel </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 texto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus

                </div>
            </div>

            <div class="barra_final_historia" >
                <div class="row nopadding">
                    <div class="col-lg-6">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <i class="fa fa-share-alt margin_iconos_barra_inferior" aria-hidden="true"></i>
                    </div>

                    <div class="col-lg-3 text-right numero_alternativas">
                        8 alternativas
                    </div>

                    <div class="col-lg-3 nopadding">
                        <span class="boton_crear_continuacion">Crear continuación</span>
                    </div>
                </div>
            </div>


        </div>

        </div>
    </div>
  `,
  styleUrls: ['./visor-wall.component.scss']
})

export class VisorWall {
      //style="background-color: red;"
      constructor() {

      }

      ngOnInit() {

      }

}
