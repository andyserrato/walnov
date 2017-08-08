import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejarComentarioComponent } from './dejar-comentario.component';

describe('DejarComentarioComponent', () => {
  let component: DejarComentarioComponent;
  let fixture: ComponentFixture<DejarComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DejarComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
