import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRelatosPaginadorComponent } from './card-relatos-paginador.component';

describe('CardRelatosPaginadorComponent', () => {
  let component: CardRelatosPaginadorComponent;
  let fixture: ComponentFixture<CardRelatosPaginadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRelatosPaginadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRelatosPaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
