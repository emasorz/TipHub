import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVariansComponent } from './select-varians.component';

describe('SelectVariansComponent', () => {
  let component: SelectVariansComponent;
  let fixture: ComponentFixture<SelectVariansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVariansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVariansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
