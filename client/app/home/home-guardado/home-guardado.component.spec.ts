import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGuardadoComponent } from './home-guardado.component';

describe('HomeGuardadoComponent', () => {
  let component: HomeGuardadoComponent;
  let fixture: ComponentFixture<HomeGuardadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGuardadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
