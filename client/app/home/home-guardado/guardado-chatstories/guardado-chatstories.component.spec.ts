import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadoChatstoriesComponent } from './guardado-chatstories.component';

describe('GuardadoChatstoriesComponent', () => {
  let component: GuardadoChatstoriesComponent;
  let fixture: ComponentFixture<GuardadoChatstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadoChatstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadoChatstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
