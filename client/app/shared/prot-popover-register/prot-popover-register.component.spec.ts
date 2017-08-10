import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtPopoverRegisterComponent } from './prot-popover-register.component';

describe('ProtPopoverRegisterComponent', () => {
  let component: ProtPopoverRegisterComponent;
  let fixture: ComponentFixture<ProtPopoverRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtPopoverRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtPopoverRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
