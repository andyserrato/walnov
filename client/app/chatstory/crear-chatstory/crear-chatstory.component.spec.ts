import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearChatstoryComponent } from './crear-chatstory.component';

describe('CrearChatstoryComponent', () => {
  let component: CrearChatstoryComponent;
  let fixture: ComponentFixture<CrearChatstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearChatstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearChatstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
