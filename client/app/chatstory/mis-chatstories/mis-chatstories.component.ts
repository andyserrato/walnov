import { Component, OnInit } from '@angular/core';

import { Story } from './chat-story.model';

@Component({
  selector: 'app-mis-chatstories',
  templateUrl: './mis-chatstories.component.html',
  styleUrls: ['./mis-chatstories.component.scss']
})
export class MisChatstoriesComponent implements OnInit {
  showMessage:boolean = true;
  stories: Array<Story> = new Array<Story>();
  story1: Story;

  constructor() {

 }

  ngOnInit() {
    this.story1 = new Story();
    this.story1.titulo = 'El misterio de la biblioteca';
    this.story1.fecha = new Date();
    this.addStory(this.story1);

  }

  addStory(newStory: Story) {
    if (newStory) {
        this.stories.push(newStory);
        this.showMessage = false;

    }
  }

  deleteStory(oldStory: Story){
    this.stories.splice(this.stories.indexOf(oldStory), 1);
    
  }

}
