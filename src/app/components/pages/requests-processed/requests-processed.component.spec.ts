import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsProcessedComponent } from './requests-processed.component';

describe('RequestsProcessedComponent', () => {
  let component: RequestsProcessedComponent;
  let fixture: ComponentFixture<RequestsProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
