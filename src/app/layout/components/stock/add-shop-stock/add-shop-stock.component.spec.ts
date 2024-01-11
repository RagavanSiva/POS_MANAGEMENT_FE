import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopStockComponent } from './add-shop-stock.component';

describe('AddShopStockComponent', () => {
  let component: AddShopStockComponent;
  let fixture: ComponentFixture<AddShopStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddShopStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddShopStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
