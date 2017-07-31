import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadoRelatosComponent } from './guardado-relatos.component';

describe('GuardadoRelatosComponent', () => {
  let component: GuardadoRelatosComponent;
  let fixture: ComponentFixture<GuardadoRelatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadoRelatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadoRelatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
