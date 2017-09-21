import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TranslateService } from '../../translate';
import { RepositorioService } from '../../services/repositorio.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-buscador',
  templateUrl: './nav-buscador.component.html',
  styleUrls: ['./nav-buscador.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NavBuscadorComponent implements OnInit {
  searchTerm$ = new Subject<string>(); //Servicio buscador
  busqueda: String;
  visible = false;
  @ViewChild('div') div: ElementRef;
  constructor(private repositorio: RepositorioService, private searchService: SearchService) { }

  ngOnInit() {
    this.busqueda = this.repositorio.busquedaActual;
    // console.log(document.getElementById("caja"));
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.repositorio.results = results.results;
    });
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
      this.setValue();
    }
  }

  close() {
    this.visible = false;
    this.setValue();
  }

  setValue() {
    this.repositorio.busquedaActual = this.busqueda;
    // console.log(this.repositorio.busquedaActual);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async iniciar() {
    this.visible=true;
    await this.sleep(100);
    if(this.visible) document.getElementById("caja").focus();

  }

  // iniciar() {
  //   this.visible=true;
  //   console.log(document.getElementById("div"));
  //   // document.getElementById("caja").focus();
  // }



  // changeTo(idioma) {
  //   this.translate.use(idioma);
  //   // this.close();
  // }

}
