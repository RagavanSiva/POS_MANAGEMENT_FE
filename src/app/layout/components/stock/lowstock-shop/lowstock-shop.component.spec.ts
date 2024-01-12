import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowstockShopComponent } from './lowstock-shop.component';

describe('LowstockShopComponent', () => {
  let component: LowstockShopComponent;
  let fixture: ComponentFixture<LowstockShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowstockShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowstockShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
