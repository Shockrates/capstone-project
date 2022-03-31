import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceType } from 'src/app/models/devicetypes';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges{

  @Input() 
  employee: Employee = new Employee('','');
 
  @Input() toggle: any="CREATE";

  @Output() emitEmployee=new EventEmitter();
  employeeForm: FormGroup | any;
  

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    
  /**
   * Initializes the Form 
   */
    this.employeeForm = this.fb.group({
      //id:['', Validators.required],
      name:['', Validators.compose(
        [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(255)]
        )], 
      email:['', Validators.compose(
        [Validators.required, 
        Validators.email]
      )],
      devices: this.fb.array([])

    })    
  }

  ngOnInit(): void {
    console.log(this.employeeService.employeesList);
  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'employee'**************/
    this.populateEmployeeForm()
   
    }   
    
  /**
   * Assigns values of Employee object from parent to input fields
   */
  populateEmployeeForm(){
    //this.employeeForm.get('id').setValue(this.employee.id)
    this.employeeForm.get('name').setValue(this.employee.name)
    this.employeeForm.get('email').setValue(this.employee.email)
  
    //Empties any assigned devices in the form
    while (this.deviceForms.length !== 0) {
      this.deviceForms.removeAt(0)
    } 
    this.employee.devices.forEach((device) => {
      this.addDevice(device)
    });
  }

  //Returns the employeeForm "devices" FromArray
  get deviceForms() {
    return this.employeeForm.get('devices') as FormArray
  }

  //Adds a device to the devices formArray
  addDevice(device: Device) {
    const newDevice = this.fb.group({ 
      _id: device._id,
      serialnumber: device.serialnumber,
      description: device.description,
      type:DeviceType[device.type] ,
    })
    this.deviceForms.push(newDevice);
  }
  
  unassignDevice(i:number) {
    this.deviceForms.removeAt(i)
  }

  /**
   * Triggers when From is submitted. Depending on toggle value will either run createEmployee() 
   * or updateEmployee()
   */
  submitEmployee(){
    if (this.toggle=="CREATE") {
      this.createEmployee();
      // this.router.navigate(['']);
    } else {
      this.updateEmployee();
    }
  }
  
  /**
   * Calls the createEmployee() method from service
   */
  createEmployee(){
    const employee: Employee = new Employee(
      this.employeeForm.get('name').value,
      this.employeeForm.get('email').value,
      this.employeeForm.get('devices').value

    ); 
    this.employeeService.createEmployee(employee)
    this.employeeService.employeesList.push(employee) 
    console.log(this.employeeService.employeesList);
    this.router.navigate(['']);
  }

  /**
   * Calls the updateEmployee() method from service, 
   * subcribes response to an Employee object then 
   * emits the updated employee to the parent
   */
  updateEmployee():void {
    const employee: Employee = new Employee(
      //this.employeeForm.get('id').value,
      this.employeeForm.get('name').value,
      this.employeeForm.get('email').value,
      this.employeeForm.get('devices').value
    ); 
    this.employeeService.updateEmployee(employee,this.employee._id)
      .subscribe((data)=>{
        const updatedEmployee = new Employee(data.name,data.email, data.devices, data.id, data._id);
        this.emitEmployee.emit(updatedEmployee);
          
    })     
    
  }

}
