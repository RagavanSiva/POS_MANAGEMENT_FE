import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { BrandService } from '../../../../_service/brand.service';
import { VehicleTypeService } from '../../../../_service/vehicle-type.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddWarehouseStockComponent } from '../add-warehouse-stock/add-warehouse-stock.component';
import { AddShopStockComponent } from '../add-shop-stock/add-shop-stock.component';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { EventTriggerService } from '../../../../_service/event-trigger.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.sass',
})
export class StockComponent implements OnInit {
  dataSet: any[] = [];
  brand: any;
  size = '';
  page = 1;
  limit = 10;
  total = 0;
  vehicleType: any;
  brandList: any[] = [];
  vehicleTypeList: any[] = [];
  barcodeImage: any;
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private vehicleService: VehicleTypeService,
    private modalService: NzModalService,
    private event: EventTriggerService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.getAllProductDetails();
    this.getBrandDetails();
    this.getVehicleDetails();
    this.event.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'manage') {
          this.getAllProductDetails();
        }
      },
    });
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
    data['page'] = this.page;
    data['limit'] = this.limit;
    data['size'] = this.size;
    data['vehicleType'] = this.vehicleType;
    data['brand'] = this.brand;
    this.productService.getAllProducts(data).subscribe({
      next: (res: any) => {
        this.dataSet = res.products;
        this.total = res.totalSize;
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllProductDetails();
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
    this.productService.updateProduct = null;
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
  delete(id: any) {
    this.productService.delete(id).subscribe({
      next: (res: any) => {
        this.notification.create(
          'success',
          'Deleted',
          'Product Deleted Successfully'
        );
        this.getAllProductDetails();
      },
    });
  }
  updateProduct(data: any) {
    this.productService.updateProduct = data;
    const modal = this.modalService.create({
      nzContent: AddStockComponent,
      nzFooter: null,
      nzTitle: 'Update Product',
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
  generateBarcode(productId: any, product: any) {
    this.productService.generateBarcode(productId).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger a download
      const a = document.createElement('a');
      a.href = url;
      a.download =
        product?.brand?.name +
        ' ' +
        product.size +
        ' ' +
        product.pattern +
        '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    });
  }
}
