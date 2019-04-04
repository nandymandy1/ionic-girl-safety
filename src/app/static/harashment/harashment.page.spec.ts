import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarashmentPage } from './harashment.page';

describe('HarashmentPage', () => {
  let component: HarashmentPage;
  let fixture: ComponentFixture<HarashmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarashmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarashmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
