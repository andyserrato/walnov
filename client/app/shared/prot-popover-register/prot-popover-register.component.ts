import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() visible: boolean;
  @ViewChild('div') div: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('user') user: ElementRef;
  @Input() direction: string;
  @Output() loged: EventEmitter<any>;
  @Output() focusOut: EventEmitter<any>;
  validateForm:FormGroup;
  view:string = 'register';
  constructor(private fb: FormBuilder) {
    this.loged = new EventEmitter<any>();
    this.focusOut = new EventEmitter<any>();
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
      this.focusOut.emit();
      this.view='register';
    }
  }

  changeView(str:string) {
    this.view=str;
  }

  register() {
    console.log(this.mail.nativeElement.value+', '+this.pass.nativeElement.value+', '+this.user.nativeElement.value);
    this.visible = false;
    console.log(this.user.nativeElement.value+', '+this.pass.nativeElement.value);
    this.loged.emit();
  }

  login() {
    this.visible = false;
    console.log(this.user.nativeElement.value+', '+this.pass.nativeElement.value);
    this.loged.emit();
  }

}
