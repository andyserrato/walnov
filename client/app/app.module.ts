import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AuthenticationModule } from './authentication/authentication.module';

import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { AuthGuard } from './guards/auth-guard.guard';

import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RepositorioService } from './services/repositorio.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
//Walls
import { Walls } from './walls/walls.component';
import { CrearWallComponent } from './crear-wall/crear-wall.component';
import { VisorWall } from './visor-wall/visor-wall.component';
import { InfoItemAutor } from './walls/info-item-autor.component';
import { ListadoWalls } from './walls/listado-walls.component';
import { MiniaturaWall } from './walls/miniatura-wall.component';

import { LandingComponent } from './landing/landing.component';
import { FeedComponent } from './feed/feed.component';
import { CardInformativoComponent } from './shared/card-informativo/card-informativo.component';
import { CardTagsComponent } from './cards/card-tags/card-tags.component';

import { RegisterPopoverComponent } from './shared/register-popover/register-popover.component';
import { CrearChatstoryStep1Component } from './chatstory/crear-chatstory-step-1/crear-chatstory-step-1.component';
import { ImagePickerComponent } from './shared/image-picker/image-picker.component';
import { CrearPersonajeChatstoryComponent } from './chatstory/crear-personaje-chatstory/crear-personaje-chatstory.component';
import { MisChatstoriesComponent } from './chatstory/mis-chatstories/mis-chatstories.component';
import { SelectImageComponent } from './shared/image-picker/select-image/select-image.component';
import { UploadImageComponent } from './shared/image-picker/upload-image/upload-image.component';
import { VerifyUserComponent } from './shared/image-picker/verify-user/verify-user.component';
import { PersonajeLiComponent } from './chatstory/crear-personaje-chatstory/personaje-li/personaje-li.component';
import { CrearChatstoryStep2Component } from './chatstory/crear-chatstory-step-2/crear-chatstory-step-2.component';
import { CrearChatstoryComponent } from './chatstory/crear-chatstory/crear-chatstory.component';
import { ChatstoryMessageComponent } from './chatstory/crear-chatstory-step-2/chatstory-message/chatstory-message.component';
import { TagBgComponent } from './shared/components/tag-bg/tag-bg.component';
import { CardMiBibliotecaComponent } from './shared/card-mi-biblioteca/card-mi-biblioteca.component';
import { VerChatstoryComponent } from './chatstory/ver-chatstory/ver-chatstory.component';
import { CardMiBibliotecaBuscadorComponent } from './shared/card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import { CardCategoriasComponent } from './shared/card-categorias/card-categorias.component';
import { ListadoChatstoriesComponent } from './chatstory/listado-chatstories/listado-chatstories.component';
import { CardChatstoriesPaginadorComponent } from './shared/card-chatstories-paginador/card-chatstories-paginador.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCardComponent } from './user-profile/user-card/user-card.component';
import { UserContentComponent } from './user-profile/user-content/user-content.component';
import { CardRelatosPaginadorComponent } from './shared/card-relatos-paginador/card-relatos-paginador.component';
import { BuscadorRelatosComponent } from './relatos/buscador-relatos/buscador-relatos.component';
import { UserContentChatstoriesComponent } from './user-profile/user-content/user-content-chatstories/user-content-chatstories.component';
import { CrearRelatoComponent } from './relatos/crear-relato/crear-relato.component';
import { CrearRelatoContentComponent } from './relatos/crear-relato/crear-relato-content/crear-relato-content.component';
import { CardInfoRelatoComponent } from './shared/card-info-relato/card-info-relato.component';
import { VerRelatoComponent } from './shared/ver-relato/ver-relato.component';
import { DejarComentarioComponent } from './shared/dejar-comentario/dejar-comentario.component';
import { OpinionUsuarioComponent } from './shared/opinion-usuario/opinion-usuario.component';
import {ChatstoryService} from './services/chatstory.service';
import {RelatoService} from './services/relato.service';
import {WindowService} from './services/window.service';
import { SuccessComponent } from './shared/social-login/success/success.component';
import { FailureComponent } from './shared/social-login/failure/failure.component';
import { ProtPopoverRegisterComponent } from './shared/prot-popover-register/prot-popover-register.component';
import { UserContentRelatosComponent } from './user-profile/user-content/user-content-relatos/user-content-relatos.component';
import { RelatoComponent } from './relatos/relato/relato.component';
import { CardContinuacionComponent } from './shared/card-continuacion/card-continuacion.component';
import { UserContentContinuacionesComponent } from './user-profile/user-content/user-content-continuaciones/user-content-continuaciones.component';
import { UserContentHistoriasComponent } from './user-profile/user-content/user-content-historias/user-content-historias.component';
import { CardHistoriaComponent } from './shared/card-historia/card-historia.component';
import { ProfilePopoverComponent } from './shared/profile-popover/profile-popover.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { CapitalizePipe } from './pipe/capitalize/capitalize.pipe';
import { ModalDecorationComponent } from './modal/modal-decoration/modal-decoration.component';
import { PricingComponent } from './pricing/pricing.component';
import { PricingPremiumComponent } from './pricing/pricing-premium/pricing-premium.component';
import { PricingPartnerComponent } from './pricing/pricing-partner/pricing-partner.component';
import { PricingPremiumPruebaComponent } from './pricing/pricing-premium/pricing-premium-prueba/pricing-premium-prueba.component';
import { PricingPremiumCheckoutComponent } from './pricing/pricing-premium/pricing-premium-checkout/pricing-premium-checkout.component';
import { PricingPremiumNormalComponent } from './pricing/pricing-premium/pricing-premium-normal/pricing-premium-normal.component';
import { UserAccountModule } from './user-account/user-account.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ContactoComponent } from './contacto/contacto.component';
import { OrderByPipe } from './pipe/order-by/order-by.pipe';
import { BibliotecaService } from './services/biblioteca.service';
import { RegisterPopoverService } from './services/register-popover.service';
// import {TRANSLATION_PROVIDERS, TranslatePipe, TranslateService} from './translate'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    CrearWallComponent,
    LandingComponent,
    FeedComponent,
    RegisterPopoverComponent,
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
    UserProfileComponent,
    UserCardComponent,
    UserContentComponent,
    CardRelatosPaginadorComponent,
    BuscadorRelatosComponent,
    UserContentChatstoriesComponent,
    CrearRelatoComponent,
    CrearRelatoContentComponent,
    CardInfoRelatoComponent,
    VerRelatoComponent,
    DejarComentarioComponent,
    OpinionUsuarioComponent,
    SuccessComponent,
    FailureComponent,
    ProtPopoverRegisterComponent,
    UserContentRelatosComponent,
    RelatoComponent,
    CardContinuacionComponent,
    UserContentContinuacionesComponent,
    UserContentHistoriasComponent,
    CardHistoriaComponent,
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
    // TranslatePipe
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
    routing,
    BrowserAnimationsModule,
    AuthenticationModule,
    UserAccountModule,
    NgbModule.forRoot(),
    SharedModule,
    HomeModule
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
    RegisterPopoverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
