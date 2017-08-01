import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerChatstoryComponent } from './ver-chatstory.component';

describe('VerChatstoryComponent', () => {
  let component: VerChatstoryComponent;
  let fixture: ComponentFixture<VerChatstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerChatstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerChatstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
