import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../services/device.service';



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices:Device[] = []
  device?: Device;
  
  
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getAllDevices()
  }

  getAllDevices(): void {
    this.deviceService.getAllDevices()
      .subscribe(
        (data) => {
          for(let key in data){
            console.log(data[key]);
            this.devices.push(new Device( data[key]._id, data[key].serialnumber, data[key].description, data[key].type,data[key].employeeId))
            }
        },
        error => {
          console.log(error);
        });
  }


}
