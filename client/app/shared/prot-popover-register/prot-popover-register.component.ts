import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-prot-popover-register',
  templateUrl: './prot-popover-register.component.html',
  styleUrls: ['./prot-popover-register.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProtPopoverRegisterComponent implements OnInit {
  visible: boolean = false;
  @ViewChild('div') div: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('user') user: ElementRef;
  @Input() direction: string;
  validateForm:FormGroup;
  view:string = 'register';
  constructor(private fb: FormBuilder) {
    this.validateForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.email])],
      'user': [null, Validators.required],
      'pass': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
      this.view='register';
    }
  }

  changeView(str:string) {
    this.view=str;
  }

  register() {
    console.log(this.mail.nativeElement.value+', '+this.pass.nativeElement.value+', '+this.user.nativeElement.value);
  }

  login() {
    console.log(this.user.nativeElement.value+', '+this.pass.nativeElement.value);
  }

}
