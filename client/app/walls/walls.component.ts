import { Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'walls',
  template: `
    <div class="row">
        <div class="col-lg-2">
            <info-item-autor></info-item-autor>
        </div>

        <div class="col-lg-7" style="">
            <router-outlet></router-outlet>
        </div>

        <div class="col-lg-3" style="">
            JUAS
        </div>
    </div>
  `,
  styleUrls: ['./walls.component.scss']
})

export class Walls {

      constructor() {

      }

      ngOnInit() {

      }

}
