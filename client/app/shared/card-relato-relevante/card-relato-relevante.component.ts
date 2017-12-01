import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import {Router} from '@angular/router';
import {RelatoService} from '../../services/relato.service';

@Component({
  selector: 'app-card-relato-relevante',
  templateUrl: './card-relato-relevante.component.html',
  styleUrls: ['./card-relato-relevante.component.scss']
})
export class CardRelatoRelevanteComponent implements OnInit {
  relatos: any;
  constructor(private repositorio: RepositorioService,
              private router: Router,
              private relatosService: RelatoService) { }

  ngOnInit() {
    this.loadRelatosRelevantes();
  }

  showAnother() {
    const relato = this.relatos[0];
    this.relatos.splice(0, 1);
    this.relatos.push(relato);

  }

  loadRelato(relato) {
    this.router.navigate(['/relato/' + relato.id]);
  }

  getBorder(relato: any) {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(relato.categoria).color;

  }

  getColor(relato: any) {
    return this.repositorio.categoriasHM.get(relato.categoria).color;
  }

  loadRelatosRelevantes() {
    const myParams = new URLSearchParams();
    myParams.append('top', '20');

    this.relatosService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      this.relatos = relatos;
      setInterval(this.showAnother.bind(this), 30000, );
    }, error => {
      // cargar mensaje inspirador
    });
  }
}
