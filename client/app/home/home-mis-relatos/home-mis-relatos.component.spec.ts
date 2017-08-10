import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMisRelatosComponent } from './home-mis-relatos.component';

describe('HomeMisRelatosComponent', () => {
  let component: HomeMisRelatosComponent;
  let fixture: ComponentFixture<HomeMisRelatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMisRelatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMisRelatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
