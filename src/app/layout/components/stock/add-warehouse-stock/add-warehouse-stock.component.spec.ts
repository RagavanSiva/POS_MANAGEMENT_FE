import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseStockComponent } from './add-warehouse-stock.component';

describe('AddWarehouseStockComponent', () => {
  let component: AddWarehouseStockComponent;
  let fixture: ComponentFixture<AddWarehouseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWarehouseStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWarehouseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
