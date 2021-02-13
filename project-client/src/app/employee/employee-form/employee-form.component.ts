import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Device } from 'src/app/models/device';
import { Employee } from 'src/app/models/employee';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() 
  selectedEmployee: Employee = new Employee('','','','');
  employeeForm: FormGroup | any;
  unassignedDevices: Device[]=[];
  constructor(private fb: FormBuilder, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.unassignedDevices=this.deviceService.returnUnassignedDevices()
    this.employeeForm = this.fb.group({
      name:this.selectedEmployee.name,
      email: this.selectedEmployee.email,
      devices: this.fb.array([])
    })
  }

  get deviceForms() {
    return this.employeeForm.get('devices') as FormArray
  }

  addDevice(device: Device) {
    const newDevice = this.fb.group({ 
      serialnumber: device.serialnumber,
      description: device.description,
      type: device.type,
    })
  
    this.deviceForms.push(newDevice);
  }
  
  unassignDevice(i:number) {
    this.deviceForms.removeAt(i)
  }

}
