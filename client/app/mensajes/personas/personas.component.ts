import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  @Input() personas: any;
  @Input() selected: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {
  }

  ngOnInit() {
    
  }

  selectItem(persona: any) {
    this.select.emit(persona);
  }

}
