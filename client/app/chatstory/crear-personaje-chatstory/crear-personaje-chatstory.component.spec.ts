import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPersonajeChatstoryComponent } from './crear-personaje-chatstory.component';

describe('CrearPersonajeChatstoryComponent', () => {
  let component: CrearPersonajeChatstoryComponent;
  let fixture: ComponentFixture<CrearPersonajeChatstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPersonajeChatstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPersonajeChatstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
