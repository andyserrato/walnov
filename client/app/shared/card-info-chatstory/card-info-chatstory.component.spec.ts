import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoChatstoryComponent } from './card-info-chatstory.component';

describe('CardInfoChatstoryComponent', () => {
  let component: CardInfoChatstoryComponent;
  let fixture: ComponentFixture<CardInfoChatstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInfoChatstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoChatstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
