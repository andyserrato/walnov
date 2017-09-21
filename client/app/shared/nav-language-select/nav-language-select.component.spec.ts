import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLanguageSelectComponent } from './nav-language-select.component';

describe('NavLanguageSelectComponent', () => {
  let component: NavLanguageSelectComponent;
  let fixture: ComponentFixture<NavLanguageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLanguageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
