import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { BrandService } from '../../../../_service/brand.service';
import { VehicleTypeService } from '../../../../_service/vehicle-type.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddWarehouseStockComponent } from '../add-warehouse-stock/add-warehouse-stock.component';
import { AddShopStockComponent } from '../add-shop-stock/add-shop-stock.component';
import { AddStockComponent } from '../add-stock/add-stock.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.sass',
})
export class StockComponent implements OnInit {
  dataSet: any[] = [];
  brand: any;
  size = '';
  vehicleType: any;
  brandList: any[] = [];
  vehicleTypeList: any[] = [];
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private vehicleService: VehicleTypeService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.getAllProductDetails();
    this.getBrandDetails();
    this.getVehicleDetails();
  }

  getBrandDetails() {
    this.brandService.getAllBrandDetails().subscribe({
      next: (res: any) => {
        this.brandList = res;
      },
    });
  }
  getVehicleDetails() {
    this.vehicleService.getAllVehicleDetails().subscribe({
      next: (res: any) => {
        this.vehicleTypeList = res;
      },
    });
  }
  getAllProductDetails() {
    const data: any = {};
    data['size'] = this.size;
    data['vehicleType'] = this.vehicleType;
    data['brand'] = this.brand;
    this.productService.getAllProducts(data).subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }

  addStockToWarehouse() {
    const modal = this.modalService.create({
      nzContent: AddWarehouseStockComponent,
      nzFooter: null,
      nzTitle: 'Add Stock to Warehouse',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getAllProductDetails();
      },
    });
  }
  addNewProduct() {
    const modal = this.modalService.create({
      nzContent: AddStockComponent,
      nzFooter: null,
      nzTitle: 'Add New Product',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getAllProductDetails();
      },
    });
  }

  addStockToShop() {
    const modal = this.modalService.create({
      nzContent: AddShopStockComponent,
      nzFooter: null,
      nzTitle: 'Add Stock to Shop',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getAllProductDetails();
      },
    });
  }
  download() {
    this.productService.downloadCSV().subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger a download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Products.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    });
  }
}
