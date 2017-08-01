import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecienteComponent } from './home-reciente.component';

describe('HomeRecienteComponent', () => {
  let component: HomeRecienteComponent;
  let fixture: ComponentFixture<HomeRecienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRecienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
