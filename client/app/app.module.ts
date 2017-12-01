import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule} from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {routing} from './app.routing';
import {AppConfig} from './app.config';
import {AuthGuard} from './guards/auth-guard.guard';

import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {RepositorioService} from './services/repositorio.service';
import {ClipboardModule} from 'ngx-clipboard';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {InicioComponent} from './inicio/inicio.component';
import {AlertComponent} from './alert/alert.component';
import {Walls} from './walls/walls.component';
import {CrearWallComponent} from './crear-wall/crear-wall.component';
import {VisorWall} from './visor-wall/visor-wall.component';
import {InfoItemAutor} from './walls/info-item-autor.component';
import {ListadoWalls} from './walls/listado-walls.component';
import {MiniaturaWall} from './walls/miniatura-wall.component';

import {LandingComponent} from './landing/landing.component';
import {FeedComponent} from './feed/feed.component';
import {CardTagsComponent} from './cards/card-tags/card-tags.component';
import {CrearChatstoryStep1Component} from './chatstory/crear-chatstory-step-1/crear-chatstory-step-1.component';
import {ImagePickerComponent} from './shared/image-picker/image-picker.component';
import {CrearPersonajeChatstoryComponent} from './chatstory/crear-personaje-chatstory/crear-personaje-chatstory.component';
import {MisChatstoriesComponent} from './chatstory/mis-chatstories/mis-chatstories.component';
import {SelectImageComponent} from './shared/image-picker/select-image/select-image.component';
import {UploadImageComponent} from './shared/image-picker/upload-image/upload-image.component';
import {VerifyUserComponent} from './shared/image-picker/verify-user/verify-user.component';
import {PersonajeLiComponent} from './chatstory/crear-personaje-chatstory/personaje-li/personaje-li.component';
import {CrearChatstoryStep2Component} from './chatstory/crear-chatstory-step-2/crear-chatstory-step-2.component';
import {CrearChatstoryComponent} from './chatstory/crear-chatstory/crear-chatstory.component';
import {ChatstoryMessageComponent} from './chatstory/crear-chatstory-step-2/chatstory-message/chatstory-message.component';
import {TagBgComponent} from './shared/components/tag-bg/tag-bg.component';
import {CardMiBibliotecaComponent} from './shared/card-mi-biblioteca/card-mi-biblioteca.component';
import {VerChatstoryComponent} from './chatstory/ver-chatstory/ver-chatstory.component';
import {CardMiBibliotecaBuscadorComponent} from './shared/card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import {CardCategoriasComponent} from './shared/card-categorias/card-categorias.component';
import {ListadoChatstoriesComponent} from './chatstory/listado-chatstories/listado-chatstories.component';
import {CardChatstoriesPaginadorComponent} from './shared/card-chatstories-paginador/card-chatstories-paginador.component';
import {CardRelatosPaginadorComponent} from './shared/card-relatos-paginador/card-relatos-paginador.component';
import {BuscadorRelatosComponent} from './relatos/buscador-relatos/buscador-relatos.component';
import {CrearRelatoComponent} from './relatos/crear-relato/crear-relato.component';
import {CrearRelatoContentComponent} from './relatos/crear-relato/crear-relato-content/crear-relato-content.component';
import {CardInfoRelatoComponent} from './shared/card-info-relato/card-info-relato.component';
import {VerRelatoComponent} from './shared/ver-relato/ver-relato.component';
import {DejarComentarioComponent} from './shared/dejar-comentario/dejar-comentario.component';
import {OpinionUsuarioComponent} from './shared/opinion-usuario/opinion-usuario.component';
import {ChatstoryService} from './services/chatstory.service';
import {RelatoService} from './services/relato.service';
import {WindowService} from './services/window.service';
import {SuccessComponent} from './shared/social-login/success/success.component';
import {FailureComponent} from './shared/social-login/failure/failure.component';
import {ProtPopoverRegisterComponent} from './shared/prot-popover-register/prot-popover-register.component';
import {RelatoComponent} from './relatos/relato/relato.component';
import {ProfilePopoverComponent} from './shared/profile-popover/profile-popover.component';
import {ModalComponent} from './modal/modal.component';
import {ModalService} from './services/modal.service';
import {CapitalizePipe} from './pipe/capitalize/capitalize.pipe';
import {ModalDecorationComponent} from './modal/modal-decoration/modal-decoration.component';
import {PricingComponent} from './pricing/pricing.component';
import {PricingPremiumComponent} from './pricing/pricing-premium/pricing-premium.component';
import {PricingPartnerComponent} from './pricing/pricing-partner/pricing-partner.component';
import {PricingPremiumPruebaComponent} from './pricing/pricing-premium/pricing-premium-prueba/pricing-premium-prueba.component';
import {PricingPremiumCheckoutComponent} from './pricing/pricing-premium/pricing-premium-checkout/pricing-premium-checkout.component';
import {PricingPremiumNormalComponent} from './pricing/pricing-premium/pricing-premium-normal/pricing-premium-normal.component';
import {UserAccountModule} from './user-account/user-account.module';
import {HomeModule} from './home/home.module';
import {UserProfileModule} from './user-profile/user-profile.module';
import {SharedModule} from './shared/shared.module';
import {ContactoComponent} from './contacto/contacto.component';
import {OrderByPipe} from './pipe/order-by/order-by.pipe';
import {BibliotecaService} from './services/biblioteca.service';
import {RegisterPopoverService} from './services/register-popover.service';
import {LandingMobileComponent} from './landing/landing-mobile/landing-mobile.component';
import {ShareButtonModule} from 'ngx-sharebuttons';
import {MensajesComponent} from './mensajes/mensajes.component';
import { PersonasComponent } from './mensajes/personas/personas.component';
import { ChatComponent } from './mensajes/chat/chat.component';
import { PaymentModule } from './payments/payment.module';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    InicioComponent,
    AlertComponent,
    CrearWallComponent,
    LandingComponent,
    FeedComponent,
    CrearChatstoryStep1Component,
    ImagePickerComponent,
    CrearPersonajeChatstoryComponent,
    MisChatstoriesComponent,
    SelectImageComponent,
    UploadImageComponent,
    VerifyUserComponent,
    CardTagsComponent,
    VisorWall,
    Walls,
    InfoItemAutor,
    ListadoWalls,
    MiniaturaWall,
    TagBgComponent,
    CardMiBibliotecaComponent,
    PersonajeLiComponent,
    PersonajeLiComponent,
    CrearChatstoryStep2Component,
    CrearChatstoryComponent,
    ChatstoryMessageComponent,
    CardMiBibliotecaBuscadorComponent,
    CardCategoriasComponent,
    VerChatstoryComponent,
    ListadoChatstoriesComponent,
    CardChatstoriesPaginadorComponent,
    CardRelatosPaginadorComponent,
    BuscadorRelatosComponent,
    CrearRelatoComponent,
    CrearRelatoContentComponent,
    CardInfoRelatoComponent,
    VerRelatoComponent,
    DejarComentarioComponent,
    OpinionUsuarioComponent,
    SuccessComponent,
    FailureComponent,
    ProtPopoverRegisterComponent,
    RelatoComponent,
    ProfilePopoverComponent,
    ModalComponent,
    CapitalizePipe,
    PricingComponent,
    PricingPremiumComponent,
    PricingPartnerComponent,
    PricingPremiumPruebaComponent,
    PricingPremiumCheckoutComponent,
    PricingPremiumNormalComponent,
    ModalDecorationComponent,
    ContactoComponent,
    OrderByPipe,
    ModalDecorationComponent,
    LandingMobileComponent,
    MensajesComponent,
    PersonasComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAmzOCGyNtTpdkh-8X9TIVyAwMyVoQ2zjo'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    UserAccountModule,
    SharedModule,
    HomeModule,
    UserProfileModule,
    ClipboardModule,
    ShareButtonModule.forRoot(),
    PaymentModule
  ],
  providers: [
    AppConfig,
    AuthGuard,
    RepositorioService,
    AlertService,
    AuthenticationService,
    UserService,
    ChatstoryService,
    RelatoService,
    WindowService,
    ModalService,
    CapitalizePipe,
    BibliotecaService,
    RegisterPopoverService,
    HttpModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
