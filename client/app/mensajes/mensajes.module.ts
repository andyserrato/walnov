import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MensajesComponent } from './mensajes.component';
import { ChatComponent } from './chat/chat.component';
import { PersonasComponent } from './personas/personas.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DateformatPipe } from './dateformat.pipe';

const routes: Routes = [{
    path: 'mensajes',
    component: MensajesComponent,
}];

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MensajesComponent,
        ChatComponent,
        PersonasComponent,
        DateformatPipe
    ],
    exports: [RouterModule]
})
export class MensajesModule { }