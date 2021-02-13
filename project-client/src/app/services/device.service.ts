import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  deviceList:Device[]=[]

  constructor(private http: HttpClient) { }

  //RETURNS ALL DEVICES FROM BACKEND
  getAllDevices():Observable<Device[]>{
    return this.http.get<Device[]>('http://localhost:1337/device');
     
  }

  setDeviceList(list:Device[]){
    this.deviceList=list
  }

  returnUnassignedDevices(){
    return this.deviceList.filter((device)=> device.employeeId === undefined)
  }
}
