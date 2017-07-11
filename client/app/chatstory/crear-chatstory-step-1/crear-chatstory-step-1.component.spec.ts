import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearChatstoryStep1Component } from './crear-chatstory-step-1.component';

describe('CrearChatstoryStep1Component', () => {
  let component: CrearChatstoryStep1Component;
  let fixture: ComponentFixture<CrearChatstoryStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearChatstoryStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearChatstoryStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
