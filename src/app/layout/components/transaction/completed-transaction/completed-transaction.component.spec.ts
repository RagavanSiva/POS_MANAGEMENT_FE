import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTransactionComponent } from './completed-transaction.component';

describe('CompletedTransactionComponent', () => {
  let component: CompletedTransactionComponent;
  let fixture: ComponentFixture<CompletedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
