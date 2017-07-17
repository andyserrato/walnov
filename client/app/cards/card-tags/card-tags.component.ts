import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-tags',
  templateUrl: './card-tags.component.html',
  styleUrls: ['./card-tags.component.scss']
})



export class CardTagsComponent implements OnInit {
  tags = ['Intriga','Arte','Descubrimientos' ];

  addTag(newTag: string) {
    if (newTag) {
      if(newTag.substring(0,).match(/[^a-zA-Z0-9]/)){
        alert('Error: Has introducido un caracter inválido');
        return true;
      }
      else{
        this.tags.push(newTag);
      }
    }
  }

  deleteTag(oldTag: string){
    this.tags.splice(this.tags.indexOf(oldTag), 1);

  }

  ngOnInit() {
  }
}
