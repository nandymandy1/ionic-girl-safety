import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelplinePage } from './helpline.page';

describe('HelplinePage', () => {
  let component: HelplinePage;
  let fixture: ComponentFixture<HelplinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelplinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelplinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
