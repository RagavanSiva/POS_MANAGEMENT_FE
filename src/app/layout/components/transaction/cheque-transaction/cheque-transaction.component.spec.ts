import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeTransactionComponent } from './cheque-transaction.component';

describe('ChequeTransactionComponent', () => {
  let component: ChequeTransactionComponent;
  let fixture: ComponentFixture<ChequeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChequeTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChequeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
