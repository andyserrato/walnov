import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChatstoriesPaginadorComponent } from './card-chatstories-paginador.component';

describe('CardChatstoriesPaginadorComponent', () => {
  let component: CardChatstoriesPaginadorComponent;
  let fixture: ComponentFixture<CardChatstoriesPaginadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChatstoriesPaginadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChatstoriesPaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
