import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisChatstoriesComponent } from './mis-chatstories.component';

describe('MisChatstoriesComponent', () => {
  let component: MisChatstoriesComponent;
  let fixture: ComponentFixture<MisChatstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisChatstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisChatstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
