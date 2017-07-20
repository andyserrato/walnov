import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
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
import { CrearWallComponent } from './crear-wall/crear-wall.component';
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
import { CrearChatstoryMiddleComponentComponent } from './chatstory/crear-chatstory-step-1/crear-chatstory-middle-component/crear-chatstory-middle-component.component';
import { PersonajeLiComponent } from './chatstory/crear-personaje-chatstory/personaje-li/personaje-li.component';
import { TagBgComponent } from './shared/components/tag-bg/tag-bg.component';
import { CardMiBibliotecaComponent } from './shared/card-mi-biblioteca/card-mi-biblioteca.component';

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
    TagBgComponent,
    CardMiBibliotecaComponent,
    CrearChatstoryMiddleComponentComponent,
    PersonajeLiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    AuthenticationModule,
    NgbModule.forRoot()
  ],
  providers: [
    AppConfig,
    AuthGuard,
    RepositorioService,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
