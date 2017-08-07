import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../../services/repositorio.service';
import { Relato } from '../../../models/relato';

@Component({
  selector: 'app-crear-relato-content',
  templateUrl: './crear-relato-content.component.html',
  styleUrls: ['./crear-relato-content.component.scss']
})
export class CrearRelatoContentComponent implements OnInit {
  relato: Relato;
  constructor(private repositorio: RepositorioService) {
    this.relato=new Relato();
    this.relato.imagen_url="http://www.lorempixel.com/1200/1600";
    this.relato.categoria = this.repositorio.categoriasAL[0];
  }

  ngOnInit() {

  }

  focusOut(event){
    event.preventDefault();
    event.target.blur();
    event.target.innerHTML = event.target.outerText.replace(/(\r\n|\n|\r)/gm,'');
  }

  checkLenght(event){
    if(event.target.innerHTML){
      console.log(event.target.innerHTML);
    }
  }
}
