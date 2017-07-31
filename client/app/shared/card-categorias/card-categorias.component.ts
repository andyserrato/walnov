import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.scss']
})
export class CardCategoriasComponent implements OnInit {
  @Output() category: EventEmitter<Categoria>
  constructor(private repositorio: RepositorioService) {
    this.category= new EventEmitter();
   }

  ngOnInit() {

  }

  getColor(categoria: Categoria) {
    return categoria.color;

  }

  filtrarCategoria(event, categoria) {
    this.category.emit(categoria);
    console.log(this.category);
  }

  noFiltrar(event) {
    this.category.emit(null);

  }

}
