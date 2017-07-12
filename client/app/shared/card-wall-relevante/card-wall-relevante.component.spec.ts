import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWallRelevanteComponent } from './card-wall-relevante.component';

describe('CardWallRelevanteComponent', () => {
  let component: CardWallRelevanteComponent;
  let fixture: ComponentFixture<CardWallRelevanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardWallRelevanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWallRelevanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
