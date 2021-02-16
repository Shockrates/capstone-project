import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { Employee } from 'src/app/models/employee';
import { DeviceService } from 'src/app/services/device.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  @Input()
  selectedEmployee:Employee | any
  unassignedDevices: Device[]=[]
  constructor(private router:Router, private route: ActivatedRoute, private deviceService: DeviceService, private employeeService: EmployeeService) { 

  }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    const employeeIdFromRoute = routeParams.get('id') || '';
    this.getSelectedEmployee(employeeIdFromRoute)
    this.getAllUnassignedDevices()
  }

  /**
   * 
   * @param id 
   * Fetches selected employee from the server
   */
  getSelectedEmployee(id: string){
    this.employeeService.getEmployee(id)
      .subscribe((data)=>{
        this.selectedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id)    
      })     
  }

  /**
   * Fetches all devices from the server and returns a table of only the anasigned devices
   */
  getAllUnassignedDevices(): void {
    this.deviceService.getAllDevices()
      .subscribe(
        (data) => {
          for(let key in data){
            if(data[key].employeeId === null){
              this.unassignedDevices.push(new Device( data[key].serialnumber, data[key].description, data[key].type,data[key]._id, data[key].employeeId))
            }
          }  
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * 
   * @param assignedDevice 
   * Updates selected Employee with the values of the passed device. Then Updates the device with the selected user' Id.
   * Updates SelectedEmployee and unnasigneddevices in order to refect changes to the DOM
   */
  assignDevice(assignedDevice:Device){
    this.selectedEmployee.devices.push(assignedDevice)
   
    this.employeeService.updateEmployee(this.selectedEmployee, this.selectedEmployee._id).subscribe((data)=>{
     
      const updatedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id);
   
    })     
    assignedDevice.employeeId=this.selectedEmployee._id
    this.deviceService.updateDevice(assignedDevice,assignedDevice._id).subscribe((data)=>{
  
      
      var removeIndex = this.unassignedDevices.map(function(item) { return item._id; }).indexOf(data._id);
      this.unassignedDevices.splice(removeIndex, 1);

     
    })
  }

  /**
   * 
   * @param removedDevice 
   * Removes the device from slectedEmployee's list of assigned devices.
   * Updates the device in order to remove the user's id  
   */
  unassignDevice(removedDevice:Device){

    
    var removeIndex = this.selectedEmployee.devices.map(function(item: { _id: any; }) { return item._id; }).indexOf(removedDevice._id);
    this.selectedEmployee.devices.splice(removeIndex, 1);

    this.employeeService.updateEmployee(this.selectedEmployee, this.selectedEmployee._id).subscribe((data)=>{
      const updatedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id);
    })  

    const newDevice = new Device(removedDevice.serialnumber,removedDevice.description,removedDevice.type,removedDevice._id)
    this.deviceService.updateDevice( newDevice,removedDevice._id).subscribe((data)=>{
      const device = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId);

      this.unassignedDevices.push(device)
    })

  }

}
