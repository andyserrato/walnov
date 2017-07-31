import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadoWallsComponent } from './guardado-walls.component';

describe('GuardadoWallsComponent', () => {
  let component: GuardadoWallsComponent;
  let fixture: ComponentFixture<GuardadoWallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadoWallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadoWallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
