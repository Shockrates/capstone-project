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
  selectedDevice: Device = new Device('','',-1);
  toggle:string ="NONE"
  
  
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getAllDevices()
  }

  getAllDevices(): void {
    this.deviceService.getAllDevices()
      .subscribe(
        (data) => {
          for(let key in data){
            this.devices.push(new Device( data[key].serialnumber, data[key].description, data[key].type,data[key]._id, data[key].employeeId))
            
          }
          this.deviceService.setDeviceList(this.devices)
        },
        error => {
          console.log(error);
        });
  }

  editDevice(device:Device){
    this.selectedDevice=device
    this.toggle="EDIT"
    
  }

  updateDeviceList(updateDevice:Device){

    for(let i=0; i<this.devices.length;i++){
      if(this.devices[i]._id==updateDevice._id){
      this.devices[i]._id=updateDevice._id  
      this.devices[i].employeeId=updateDevice.employeeId
      this.devices[i].serialnumber=updateDevice.serialnumber
      this.devices[i].description=updateDevice.description
      this.devices[i].type=updateDevice.type
      
      }
    }
    this.close()
   
  }
   //GEts the selected Device and reveals the DETAILS div
  showDevice(deviceID: string){
    this.deviceService.getDevice(deviceID)
      .subscribe((data)=>{
        this.selectedDevice = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId) 
        this.toggle="DETAILS"    
      })     
  }

  //GEts the selected Device and reveals the DELETE div
  deleteDevice(deviceID: string){
    this.deviceService.getDevice(deviceID)
      .subscribe((data)=>{
        this.selectedDevice = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId) 
        this.toggle="DELETE"     
      })   

  }

  //Deletes selected Device
  confirmDelete(id:string){
    this.deviceService.deleteDevice(id)
    // get index of object with id:id
    var removeIndex = this.devices.map(function(item) { return item._id; }).indexOf(id);
    // remove object
    this.devices.splice(removeIndex, 1);

    this.toggle="NONE"

  }
  close(){
    this.toggle="NONE"
  }





}
