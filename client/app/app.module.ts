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
import { HomeComponent } from './home/home.component';
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
import { CardPublicidadComponent } from './shared/card-publicidad/card-publicidad.component';
import { CardUsuarioTendenciaComponent } from './shared/card-usuario-tendencia/card-usuario-tendencia.component';
import { CardWallRelevanteComponent } from './shared/card-wall-relevante/card-wall-relevante.component';
import { PersonajeLiComponent } from './chatstory/crear-personaje-chatstory/personaje-li/personaje-li.component';
import { CrearChatstoryStep2Component } from './chatstory/crear-chatstory-step-2/crear-chatstory-step-2.component';
import { CrearChatstoryComponent } from './chatstory/crear-chatstory/crear-chatstory.component';
import { ChatstoryMessageComponent } from './chatstory/crear-chatstory-step-2/chatstory-message/chatstory-message.component';
import { TagBgComponent } from './shared/components/tag-bg/tag-bg.component';
import { CardMiBibliotecaComponent } from './shared/card-mi-biblioteca/card-mi-biblioteca.component';
import { VerChatstoryComponent } from './chatstory/ver-chatstory/ver-chatstory.component';
import { CardMiBibliotecaBuscadorComponent } from './shared/card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import { CardCategoriasComponent } from './shared/card-categorias/card-categorias.component';
import { CardChatstoryComponent } from './shared/card-chatstory/card-chatstory.component';
import { ListadoChatstoriesComponent } from './chatstory/listado-chatstories/listado-chatstories.component';
import { HomeMisChatstoriesComponent } from './home/home-mis-chatstories/home-mis-chatstories.component';
import { CardHomeNavigateComponent } from './home/card-home-navigate/card-home-navigate.component';
import { HomeGuardadoComponent } from './home/home-guardado/home-guardado.component';
import { GuardadoWallsComponent } from './home/home-guardado/guardado-walls/guardado-walls.component';
import { GuardadoRelatosComponent } from './home/home-guardado/guardado-relatos/guardado-relatos.component';
import { GuardadoChatstoriesComponent } from './home/home-guardado/guardado-chatstories/guardado-chatstories.component';
import { CardInfoPremiumComponent } from './shared/card-info-premium/card-info-premium.component';
import { HomeRecienteComponent } from './home/home-reciente/home-reciente.component';
import { RecienteNotificacionComponent } from './home/home-reciente/reciente-notificacion/reciente-notificacion.component';
import { CardChatstoriesPaginadorComponent } from './shared/card-chatstories-paginador/card-chatstories-paginador.component';
import { CardRelatoComponent } from './shared/card-relato/card-relato.component';
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
import { HomeMisRelatosComponent } from './home/home-mis-relatos/home-mis-relatos.component';
import { RelatoComponent } from './relatos/relato/relato.component';
import { CardContinuacionComponent } from './shared/card-continuacion/card-continuacion.component';
import { UserContentContinuacionesComponent } from './user-profile/user-content/user-content-continuaciones/user-content-continuaciones.component';
import { UserContentHistoriasComponent } from './user-profile/user-content/user-content-historias/user-content-historias.component';
import { CardHistoriaComponent } from './shared/card-historia/card-historia.component';
import { ProfilePopoverComponent } from './shared/profile-popover/profile-popover.component';
import { NuevoUserComponent } from './home/home-reciente/nuevo-user/nuevo-user.component';
import { CardFollowUserComponent } from './shared/card-follow-user/card-follow-user.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { CapitalizePipe } from './pipe/capitalize/capitalize.pipe';
import { ModalDecorationComponent } from './modal/modal-decoration/modal-decoration.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { CardUserAccountNavigateComponent } from './user-account/card-user-account-navigate/card-user-account-navigate.component';
import { UserAccountDataProfileComponent } from './user-account/user-account-data-profile/user-account-data-profile.component';
import { UserAccountInteresesComponent } from './user-account/user-account-intereses/user-account-intereses.component';
import { UserAccountPreferencesComponent } from './user-account/user-account-preferences/user-account-preferences.component';
import { UserAccountPremiumComponent } from './user-account/user-account-premium/user-account-premium.component';
import { LanguageSelectComponent } from './shared/language-select/language-select.component';
import { ProfileHeaderComponent } from './user-account/user-account-data-profile/profile-header/profile-header.component';
import { PricingComponent } from './pricing/pricing.component';
import { PricingPremiumComponent } from './pricing/pricing-premium/pricing-premium.component';
import { PricingPartnerComponent } from './pricing/pricing-partner/pricing-partner.component';
import { PricingPremiumPruebaComponent } from './pricing/pricing-premium/pricing-premium-prueba/pricing-premium-prueba.component';
import { PricingPremiumCheckoutComponent } from './pricing/pricing-premium/pricing-premium-checkout/pricing-premium-checkout.component';
import { PricingPremiumNormalComponent } from './pricing/pricing-premium/pricing-premium-normal/pricing-premium-normal.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CardActividadRecienteComponent } from './shared/card-actividad-reciente/card-actividad-reciente.component';
import { MessageTimePipe } from './pipe/message-time/message-time.pipe';
import { OrderByPipe } from './pipe/order-by/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    InicioComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    CrearWallComponent,
    LandingComponent,
    FeedComponent,
    CardInformativoComponent,
    RegisterPopoverComponent,
    CrearChatstoryStep1Component,
    ImagePickerComponent,
    CrearPersonajeChatstoryComponent,
    MisChatstoriesComponent,
    SelectImageComponent,
    UploadImageComponent,
    VerifyUserComponent,
    CardTagsComponent,
    CardPublicidadComponent,
    CardUsuarioTendenciaComponent,
    CardWallRelevanteComponent,
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
    HomeMisChatstoriesComponent,
    CardChatstoryComponent,
    ListadoChatstoriesComponent,
    CardHomeNavigateComponent,
    HomeGuardadoComponent,
    GuardadoWallsComponent,
    GuardadoRelatosComponent,
    GuardadoChatstoriesComponent,
    CardInfoPremiumComponent,
    HomeRecienteComponent,
    RecienteNotificacionComponent,
    CardChatstoriesPaginadorComponent,
    CardRelatoComponent,
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
    HomeMisRelatosComponent,
    RelatoComponent,
    CardContinuacionComponent,
    UserContentContinuacionesComponent,
    UserContentHistoriasComponent,
    CardHistoriaComponent,
    ProfilePopoverComponent,
    NuevoUserComponent,
    CardFollowUserComponent,
    ModalComponent,
    CapitalizePipe,
    PricingComponent,
    PricingPremiumComponent,
    PricingPartnerComponent,
    PricingPremiumPruebaComponent,
    PricingPremiumCheckoutComponent,
    PricingPremiumNormalComponent,
    ModalDecorationComponent,
    UserAccountComponent,
    CardUserAccountNavigateComponent,
    UserAccountDataProfileComponent,
    UserAccountInteresesComponent,
    UserAccountPreferencesComponent,
    UserAccountPremiumComponent,
    LanguageSelectComponent,
    ProfileHeaderComponent,
    ContactoComponent,
    CardActividadRecienteComponent,
    MessageTimePipe,
    OrderByPipe
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
    NgbModule.forRoot()
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
    CapitalizePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
