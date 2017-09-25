import {Component, OnDestroy, OnInit} from '@angular/core';
import {Relato} from '../../models/relato.model';
import {RepositorioService} from '../../services/repositorio.service';
import {AlertService} from '../../services/alert.service';
import {ActivatedRoute} from '@angular/router';
import {RelatoService} from '../../services/relato.service';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '../../translate/translate.service';
import { CardInformativoComponent } from '../../shared/card-informativo/card-informativo.component';
@Component({
  selector: 'app-crear-relato',
  templateUrl: './crear-relato.component.html',
  styleUrls: ['./crear-relato.component.scss']
})
export class CrearRelatoComponent implements OnInit, OnDestroy {
  relato: any;
  private subscription: Subscription;

  constructor(private repositorio: RepositorioService,
              private alert: AlertService,
              private route: ActivatedRoute,
              private relatoService: RelatoService,
              private translate: TranslateService) {
    this.instanciarNuevoRelato();
  }

  ngOnInit() {
    this.getRelatoBorrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRelatoBorrador() {
    this.subscription = this.route.params.subscribe(
      params => {
        const id = params['id'];
        if (id !== '0') {
          this.relatoService.getRelatoById(id).subscribe(relato => {
              this.relato = relato;
              this.relato.categoria = this.repositorio.getCategoriaALByName(this.relato.categoria);
            },
            error => {
              this.alert.error(this.translate.instant('alert_borrador_no_encontrado'));
            });
        }
      });
  }

  instanciarNuevoRelato() {
    this.relato = new Relato();
    this.relato.categoria = this.repositorio.categoriasAL[0];
  }

  getInfoCard() {
    return CardInformativoComponent.showCard;
  }

}
