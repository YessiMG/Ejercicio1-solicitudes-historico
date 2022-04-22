import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestsTableComponent } from './new-requests-table.component';

describe('NewRequestsTableComponent', () => {
  let component: NewRequestsTableComponent;
  let fixture: ComponentFixture<NewRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequestsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
