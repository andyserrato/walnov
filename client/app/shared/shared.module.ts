import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { CardInformativoComponent } from './card-informativo/card-informativo.component';
import { CardChatstoryComponent } from './card-chatstory/card-chatstory.component';
import { CardRelatoComponent } from './card-relato/card-relato.component';
import { CardFollowUserComponent } from './card-follow-user/card-follow-user.component';
import { CardActividadRecienteComponent } from './card-actividad-reciente/card-actividad-reciente.component';
import { MessageTimePipe } from '../pipe/message-time/message-time.pipe';
import { CardInfoPremiumComponent } from './card-info-premium/card-info-premium.component';
import { CardUsuarioTendenciaComponent } from './card-usuario-tendencia/card-usuario-tendencia.component';
import { CardWallRelevanteComponent } from './card-wall-relevante/card-wall-relevante.component';
import { CardPublicidadComponent } from './card-publicidad/card-publicidad.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CardUsuarioTendenciaComponent,
    CardWallRelevanteComponent,
    CardPublicidadComponent,
    LanguageSelectComponent,
    CardInformativoComponent,
    CardChatstoryComponent,
    CardRelatoComponent,
    CardFollowUserComponent,
    CardActividadRecienteComponent,
    MessageTimePipe,
    CardInfoPremiumComponent
  ],
  declarations: [
    CardPublicidadComponent,
    LanguageSelectComponent,
    CardInformativoComponent,
    CardRelatoComponent,
    CardChatstoryComponent,
    CardFollowUserComponent,
    CardActividadRecienteComponent,
    MessageTimePipe,
    CardInfoPremiumComponent,
    CardWallRelevanteComponent,
    CardUsuarioTendenciaComponent
  ]
})

export class SharedModule { }
