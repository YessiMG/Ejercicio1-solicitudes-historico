import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckHistoricalComponent } from './check-historical.component';

describe('CheckHistoricalComponent', () => {
  let component: CheckHistoricalComponent;
  let fixture: ComponentFixture<CheckHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckHistoricalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
