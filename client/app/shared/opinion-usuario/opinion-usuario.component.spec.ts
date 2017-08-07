import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionUsuarioComponent } from './opinion-usuario.component';

describe('OpinionUsuarioComponent', () => {
  let component: OpinionUsuarioComponent;
  let fixture: ComponentFixture<OpinionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
