import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
  subscriptions: Subscription[] = []
  selectedDevice: Device = new Device('','',-1);
  toggle:string ="NONE"
  
  
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    console.log(this.deviceService.deviceList);
    if (this.deviceService.deviceList.length == 0) {
      this.getAllDevices();
      this.deviceService.deviceList = this.devices;
     } else {
      this.devices = this.deviceService.deviceList;
     }
     
    //this.getAllDevices();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getAllDevices(): void {
    var subscription = this.deviceService.getAllDevices()
      .subscribe(
        (data) => {
          for(let key in data){
            this.devices.push(new Device( data[key].serialnumber, data[key].description, data[key].type,data[key]._id, data[key].employeeId))
          }
        },
        error => {
          console.log(error);
        });
    this.subscriptions.push(subscription);    
  }

  editDevice(device:Device){
    this.selectedDevice=device
    this.toggle="EDIT"
    
  }

  updateDeviceList(updateDevice:Device){

    for(let i=0; i<this.devices.length;i++){
      if(this.devices[i]._id==updateDevice._id){
      this.devices[i] = updateDevice;

      }
    }
    this.close()
   
  }
   //GEts the selected Device and reveals the DETAILS div
  showDevice(deviceID: string){
    var subscription = this.deviceService.getDevice(deviceID)
      .subscribe((data)=>{
        this.selectedDevice = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId) 
        this.toggle="DETAILS"    
      }) 
    this.subscriptions.push(subscription);    
  }

  //GEts the selected Device and reveals the DELETE div
  deleteDevice(deviceID: string){
    var subscription = this.deviceService.getDevice(deviceID)
      .subscribe((data)=>{
        this.selectedDevice = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId) 
        this.toggle="DELETE"     
      })   
    this.subscriptions.push(subscription);  
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
