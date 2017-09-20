import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBuscadorComponent } from './nav-buscador.component';

describe('NavBuscadorComponent', () => {
  let component: NavBuscadorComponent;
  let fixture: ComponentFixture<NavBuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
