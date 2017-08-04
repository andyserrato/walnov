import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRelatoComponent } from './ver-relato.component';

describe('VerRelatoComponent', () => {
  let component: VerRelatoComponent;
  let fixture: ComponentFixture<VerRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
