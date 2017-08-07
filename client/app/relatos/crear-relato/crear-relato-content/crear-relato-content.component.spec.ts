import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRelatoContentComponent } from './crear-relato-content.component';

describe('CrearRelatoContentComponent', () => {
  let component: CrearRelatoContentComponent;
  let fixture: ComponentFixture<CrearRelatoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRelatoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRelatoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
