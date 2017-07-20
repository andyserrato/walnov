import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBgComponent } from './tag-bg.component';

describe('TagBgComponent', () => {
  let component: TagBgComponent;
  let fixture: ComponentFixture<TagBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
