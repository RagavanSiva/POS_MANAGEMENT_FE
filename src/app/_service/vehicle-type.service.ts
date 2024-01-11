import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  constructor(private http: HttpClient) {}

  getAllVehicleDetails() {
    const url = environment.vehicle;
    return this.http.get(url);
  }
  saveVehicleDetails(data: any) {
    const url = environment.vehicle;
    return this.http.post(url, data);
  }
}
