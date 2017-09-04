import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuscadorComponent } from './home-buscador.component';

describe('HomeBuscadorComponent', () => {
  let component: HomeBuscadorComponent;
  let fixture: ComponentFixture<HomeBuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
