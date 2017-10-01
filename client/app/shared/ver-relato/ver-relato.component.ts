import { Component, OnInit, Input  } from '@angular/core';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { RepositorioService } from '../../services/repositorio.service';
import {AuthenticationService} from '../../services/authentication.service';
import {RelatoService} from '../../services/relato.service';
import {RegisterPopoverService} from '../../services/register-popover.service';
import {BibliotecaService} from '../../services/biblioteca.service';

@Component({
  selector: 'app-ver-relato',
  templateUrl: './ver-relato.component.html',
  styleUrls: ['./ver-relato.component.scss']
})
export class VerRelatoComponent implements OnInit {
  @Input() relato: any;
  biblioteca: any;
  addedBiblioteca = false; // se pone a true cuando el relato es añadido a la lista
  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private relatoService: RelatoService,
              private popOverService: RegisterPopoverService,
              private bibliotecaService: BibliotecaService) { }

  ngOnInit() {
    this.getBiblioteca();
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.relato.categoria.opacidad + ',' + this.relato.categoria.color + ')';
  }

  getNumber(numero: number) {
    if (numero >= 1000) return '+' + Math.round(numero / 1000) + 'K';
    return numero;

  }

  like() {
    if (this.auth.isLoggedIn()) {
      this.relatoService.likeRelato(this.relato.id, this.auth.getUser().id).subscribe((estadistica) => {
        this.relato.estadistica = estadistica;
      });
    } else {
      this.popOverService.setVisible(true);
    }
  }

  liked() {
    if (this.relato && this.relato.estadistica && this.relato.estadistica.likers && this.auth.isLoggedIn()) {
      return this.relato.estadistica.likers.indexOf(this.auth.getUser().id) !== -1;
    } else {
      return false;
    }
  }

  anyadidoBiblioteca() {
    if (this.auth.isLoggedIn() && this.biblioteca && this.biblioteca.relatos) {
      this.addedBiblioteca = this.biblioteca.relatos.find(relato => relato === this.relato.id) ? true : false;
    } else {
      this.addedBiblioteca = false;
    }
  }

  anyadirRelatoToBiblioteca() {
    if (this.auth.isLoggedIn()) {
      if (this.addedBiblioteca) {
        this.bibliotecaService.deleteRelatoOnBibliotecaByUserId(this.relato.id).subscribe( biblioteca => {
          this.biblioteca = biblioteca;
          this.addedBiblioteca = false;
        });
      } else {
        this.bibliotecaService.addRelatoOnBibliotecaByUserId(this.relato.id).subscribe( biblioteca => {
          this.biblioteca = biblioteca;
          this.addedBiblioteca = true;
        });
      }
    } else {
      this.popOverService.setVisible(true);
    }
  }

  soyAutor() {
    if (this.auth.isLoggedIn()) {
      return (this.relato && this.relato.autor && this.relato.autor.id === this.auth.getUser().id);
    } else {
      return false;
    }
  }

  getBiblioteca() {
    if (this.auth.isLoggedIn()) {
      this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe( (biblioteca) => {
        this.biblioteca = biblioteca;
        this.anyadidoBiblioteca();
      });
    }
  }
}
