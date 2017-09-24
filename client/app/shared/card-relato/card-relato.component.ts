import { Component, OnInit, Input} from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-relato',
  templateUrl: './card-relato.component.html',
  styleUrls: ['./card-relato.component.scss']
})
export class CardRelatoComponent implements OnInit {
  @Input() relato: any;
  @Input() vista: string;

  constructor(private repositorio: RepositorioService,
              private router: Router) { }

  ngOnInit() {}

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.relato.categoria.opacidad + ',' + this.relato.categoria.color + ')';
  }

  getColor() {
    return this.relato.categoria.color;
  }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;
  }

  handleClick(event) {
    this.router.navigate(['/relato/' + '59c522597b46fc1f10384251']);
  }

}
