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
import { CardBuscadorPersonasComponent } from './card-buscador-personas/card-buscador-personas.component';
import { CardBuscadorContenidoComponent } from './card-buscador-contenido/card-buscador-contenido.component';
// import {TRANSLATION_PROVIDERS, TranslatePipe, TranslateService} from '../translate';
import {TRANSLATION_PROVIDERS} from '../translate/translations';
import {TranslatePipe} from '../translate/translate.pipe';
import {TranslateService} from '../translate/translate.service';

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
    CardInfoPremiumComponent,
    CardBuscadorPersonasComponent,
    CardBuscadorContenidoComponent,
    // TRANSLATION_PROVIDERS,
    TranslatePipe,
    // TranslateService
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
    CardUsuarioTendenciaComponent,
    CardBuscadorPersonasComponent,
    CardBuscadorContenidoComponent,
    CardBuscadorContenidoComponent,
    TranslatePipe
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService

  ]
})

export class SharedModule { }
