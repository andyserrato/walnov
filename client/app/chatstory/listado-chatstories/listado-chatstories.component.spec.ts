import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoChatstoriesComponent } from './listado-chatstories.component';

describe('ListadoChatstoriesComponent', () => {
  let component: ListadoChatstoriesComponent;
  let fixture: ComponentFixture<ListadoChatstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoChatstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoChatstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
