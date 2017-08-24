import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDecorationComponent } from './modal-decoration.component';

describe('ModalDecorationComponent', () => {
  let component: ModalDecorationComponent;
  let fixture: ComponentFixture<ModalDecorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDecorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
