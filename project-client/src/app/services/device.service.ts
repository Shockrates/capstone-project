import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  deviceList:Device[]=[]

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  //RETURNS ALL DEVICES FROM BACKEND
  getAllDevices():Observable<Device[]>{
    return this.http.get<Device[]>('http://localhost:1337/device'); 
  }

  getDevice(id:string):Observable<Device>{
    return this.http.get<Device>('http://localhost:1337/device/'+id); 
  }

  createDevice(device:Device):Observable<Device>{
    return this.http.post<Device>('http://localhost:1337/device',device.getJson()); 
  }

  updateDevice(device:Device,id:string):Observable<Device>{
    return this.http.put<Device>('http://localhost:1337/device/'+ id, device.getJson())
  }

  deleteDevice(id:string){
    this.http.delete('http://localhost:1337/device/'+id)
      .subscribe((response)=>{
      
      })
  }

  setDeviceList(list:Device[]){ 
    
    this.deviceList=list
    
  }

  refreshDeviceList(){
    this.getAllDevices()
    .subscribe(
      (data) => {
        this.deviceList= []
        for(let key in data){
          this.deviceList.push(new Device( data[key].serialnumber, data[key].description, data[key].type,data[key]._id, data[key].employeeId))
        }
        //console.log(this.deviceList);
      },
      error => {
        console.log(error);
      });
     
  }
 
}
