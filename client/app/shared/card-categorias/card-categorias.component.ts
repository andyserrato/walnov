import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.scss']
})
export class CardCategoriasComponent implements OnInit {
  @Output() category: EventEmitter<Categoria>;
  @Output() sortByEvent: EventEmitter<string>;
  allSelected = true;
  constructor(private repositorio: RepositorioService) {
    this.category = new EventEmitter();
    this.sortByEvent = new EventEmitter();
   }

  ngOnInit() {
    this.repositorio.categoriasAL.forEach(this.selectedToFalse);
  }

  getColor(categoria: Categoria) {
    return categoria.color;
  }

  filtrarCategoria(event, categoria) {
    if (this.allSelected) {this.allSelected = false; }
    this.category.emit(categoria);
    this.toggleSelected(categoria);
  }

  noFiltrar(event) {
    this.category.emit(null);
    this.repositorio.categoriasAL.forEach(this.selectedToFalse);
    this.allSelected = true;
  }

  toggleSelected(categoria: Categoria) {
    this.repositorio.categoriasAL.forEach(this.selectedToFalse);
    categoria.selected = true;
  }

  selectedToFalse(categoria: Categoria) {
    categoria.selected = false;
  }

  getBackColor(categoria) {
    if (categoria === null) {
       if (this.allSelected) {return 'rgba(0,0,0,0.25)'; }
    } else if (categoria.selected) {
      return categoria.opacidad;
    }
  }

  getFontColor(categoria) {
    if (categoria === null) {
       if (this.allSelected) {return '#000000'; }
    } else if (categoria.selected) {
      return categoria.color;
    }
  }

  onSortByChange(event) {
    this.sortByEvent.emit(event.target.value);
  }
}
