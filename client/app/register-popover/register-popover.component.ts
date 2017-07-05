import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-popover',
  templateUrl: './register-popover.component.html',
  styleUrls: ['./register-popover.component.scss']
})
export class RegisterPopoverComponent implements OnInit {
  textoBoton: string;
  popoverDisplay: boolean;
  constructor() {
    this.textoBoton = 'Registrarse';
  }

  ngOnInit() {
    this.popoverDisplay = false;
  }

  togglePopover() {
    this.popoverDisplay = this.popoverDisplay ? false : true;
  }

}
