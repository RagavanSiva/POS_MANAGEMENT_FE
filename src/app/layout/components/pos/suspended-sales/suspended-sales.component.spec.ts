import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedSalesComponent } from './suspended-sales.component';

describe('SuspendedSalesComponent', () => {
  let component: SuspendedSalesComponent;
  let fixture: ComponentFixture<SuspendedSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendedSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuspendedSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
