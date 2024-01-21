import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcTransactionComponent } from './ac-transaction.component';

describe('AcTransactionComponent', () => {
  let component: AcTransactionComponent;
  let fixture: ComponentFixture<AcTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
