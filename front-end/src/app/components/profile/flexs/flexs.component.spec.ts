import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexsComponent } from './flexs.component';

describe('FlexsComponent', () => {
  let component: FlexsComponent;
  let fixture: ComponentFixture<FlexsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
