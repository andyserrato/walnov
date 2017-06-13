import { Component, OnInit } from '@angular/core';
import { Wall } from "../models/wall";
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'crear-wall',
  templateUrl: './crear-wall.component.html',
  styleUrls: ['./crear-wall.component.css']
})
export class CrearWallComponent implements OnInit {
  wall: Wall;
  imageSRC : string;
  imgTitle : string;
  
  constructor(private alertSerive: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {

  }

  fileLoad($event :any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);    

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }

}
