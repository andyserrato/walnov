import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { Categoria } from '../../models/cats';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterPopoverService } from '../../services/register-popover.service';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import {Router} from "@angular/router";
import { RelatoService } from '../../services/relato.service';

@Component({
  selector: 'app-card-relato',
  templateUrl: './card-relato.component.html',
  styleUrls: ['./card-relato.component.scss']
})
export class CardRelatoComponent implements OnInit {
  @Input() relato: any;
  @Input() vista: string;
  @ViewChild('likeButton') likeButton: ElementRef;

  constructor(private repositorio: RepositorioService, private auth: AuthenticationService,
              private poopoverService: RegisterPopoverService, private relatoService: RelatoService,
              private router: Router) { }

  ngOnInit() {}

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.repositorio.categoriasHM.get(this.relato.categoria).opacidad + ',' +
      this.repositorio.categoriasHM.get(this.relato.categoria).color + ')';
  }

  getColor() {
    return this.repositorio.categoriasHM.get(this.relato.categoria) ?
      this.repositorio.categoriasHM.get(this.relato.categoria).color :
      'blue';
  }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;
  }

  handleClick(event) {
    // if (this.addButton){
    //   if (!this.addButton.nativeElement.contains(event.target) && !this.likeButton.nativeElement.contains(event.target)) {
    //     this.router.navigate(['/chatstory/' + this.chatstory.id]);
    //   }
    // }else{
      if (!this.likeButton.nativeElement.contains(event.target)) {
        this.router.navigate(['/relato/' + this.relato.id]);
      }
    // }
    // this.router.navigate(['/relato/' + this.relato.id]);
  }

  like() {
    if (this.auth.isLoggedIn()) {
      this.relatoService.likeRelato(this.relato.id, this.auth.getUser().id).subscribe((estadistica) => {
        this.relato.estadistica = estadistica;
      });
    } else {
      this.poopoverService.setVisible(true);
    }

  }

  goToUser() {
    this.router.navigateByUrl('user-profile/' + this.relato.autor.id + '/relatos');
  }

  liked() {
      if (this.relato.estadistica && this.relato.estadistica.likers && this.auth.isLoggedIn()) {
        return this.relato.estadistica.likers.indexOf(this.auth.getUser().id) > -1;
      } else {
        return false;
      }
  }

}
