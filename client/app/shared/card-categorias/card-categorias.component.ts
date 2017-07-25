import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.scss']
})
export class CardCategoriasComponent implements OnInit {
  @Output() category: EventEmitter<Categoria>
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.category= new EventEmitter();
  }

  getColor(categoria: Categoria) {
    return categoria.color;

  }

  filtrarCategoria(event, categoria) {
    this.category.emit(categoria);
    console.log(this.category);
  }

}
