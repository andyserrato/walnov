import {Component, OnDestroy, OnInit} from '@angular/core';
import {RelatoService} from '../../services/relato.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Relato} from '../../models/relato.model';
import {RepositorioService} from '../../services/repositorio.service';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from '../../translate/translate.service';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.scss']
})
export class RelatoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  relato: any;

  constructor(private relatoService: RelatoService,
              private route: ActivatedRoute,
              private repositorio: RepositorioService,
              private alert: AlertService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.instanciarNuevoRelato();
    this.getRelato();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRelato() {
    this.subscription = this.route.params.subscribe(
      params => {
        const id = params['id'];
        if (id !== '0') {
          this.relatoService.getRelatoById(id).subscribe(relato => {
              this.relato = relato;
              this.relato.categoria = this.repositorio.getCategoriaALByName(this.relato.categoria);
            },
            error => {
              this.alert.error(this.translate.instant('alert_relato_no_encontrado'));
            });
        }
      });
  }

  instanciarNuevoRelato() {
    this.relato = new Relato();
    this.relato.categoria = this.repositorio.categoriasAL[0];
  }
}
