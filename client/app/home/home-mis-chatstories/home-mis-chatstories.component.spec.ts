import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMisChatstoriesComponent } from './home-mis-chatstories.component';

describe('HomeMisChatstoriesComponent', () => {
  let component: HomeMisChatstoriesComponent;
  let fixture: ComponentFixture<HomeMisChatstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMisChatstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMisChatstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
