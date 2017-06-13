import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearWallComponent } from './crear-wall.component';

describe('CrearWallComponent', () => {
  let component: CrearWallComponent;
  let fixture: ComponentFixture<CrearWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
