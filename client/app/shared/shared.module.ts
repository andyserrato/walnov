import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { CardInformativoComponent } from './card-informativo/card-informativo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LanguageSelectComponent,
    CardInformativoComponent
  ],
  declarations: [
    LanguageSelectComponent,
    CardInformativoComponent
  ]
})

export class SharedModule { }
