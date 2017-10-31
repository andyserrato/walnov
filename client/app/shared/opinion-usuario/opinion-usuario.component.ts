import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-opinion-usuario',
  templateUrl: './opinion-usuario.component.html',
  styleUrls: ['./opinion-usuario.component.scss']
})
export class OpinionUsuarioComponent implements OnInit {
  @Input() opiniones = Array<any>();
  constructor() { }

  ngOnInit() {
  }

  reportar() {

  }

}
