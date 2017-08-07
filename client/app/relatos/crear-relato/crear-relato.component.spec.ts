import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRelatoComponent } from './crear-relato.component';

describe('CrearRelatoComponent', () => {
  let component: CrearRelatoComponent;
  let fixture: ComponentFixture<CrearRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
