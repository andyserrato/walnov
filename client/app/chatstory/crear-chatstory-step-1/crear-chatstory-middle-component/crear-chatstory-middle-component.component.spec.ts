import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearChatstoryMiddleComponentComponent } from './crear-chatstory-middle-component.component';

describe('CrearChatstoryMiddleComponentComponent', () => {
  let component: CrearChatstoryMiddleComponentComponent;
  let fixture: ComponentFixture<CrearChatstoryMiddleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearChatstoryMiddleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearChatstoryMiddleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
