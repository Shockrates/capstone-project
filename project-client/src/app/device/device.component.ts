import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../services/device.service';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices:Device[] = []
  device?: Device;
  
  
  constructor(private deviceService: DeviceService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllDevices()
  }

  getAllDevices(): void {
    this.deviceService.getAllDevices()
      .subscribe(
        (data) => {
          for(let key in data){
            this.devices.push(new Device( data[key]._id, data[key].serialnumber, data[key].description, data[key].type,data[key].employeeId))
            
          }
          this.deviceService.setDeviceList(this.devices)
        },
        error => {
          console.log(error);
        });
  }

  getEmployeeNames(id:string){
    return this.employeeService.getEmployeeById(id)
  }


}
