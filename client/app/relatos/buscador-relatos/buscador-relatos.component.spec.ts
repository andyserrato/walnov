import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRelatosComponent } from './buscador-relatos.component';

describe('BuscadorRelatosComponent', () => {
  let component: BuscadorRelatosComponent;
  let fixture: ComponentFixture<BuscadorRelatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorRelatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRelatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
