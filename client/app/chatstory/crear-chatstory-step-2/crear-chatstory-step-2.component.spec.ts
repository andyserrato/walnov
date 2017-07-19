import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearChatstoryStep2Component } from './crear-chatstory-step-2.component';

describe('CrearChatstoryStep2Component', () => {
  let component: CrearChatstoryStep2Component;
  let fixture: ComponentFixture<CrearChatstoryStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearChatstoryStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearChatstoryStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
