//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:Employee[] = []
  selectedEmployee: Employee  = new Employee('','');
  /**
   * Used to switch visibility of Hide and Delete buttons
   * Used to modify functionality of EmployeeForm component between update and create.
   * 
   */
  toggle:string ="NONE"
  sub: any;
  subscriptions: Subscription[] = []
  
  
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.employeeService.employeesList.length == 0) {
      this.getAllEmployees();
      this.employeeService.employeesList = this.employees;
    } else {
      this.employees = this.employeeService.employeesList;
    }

    //console.log(this.employeeService.employeesList);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
    
  /**
   * Calls the getAllEmployees() from service and subscribes the result  to an Employee List
   */
  getAllEmployees(): void {
    var subscription = this.employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          for (let key in data) {
            this.employees.push(new Employee(data[key].name, data[key].email, data[key].devices, data[key].id, data[key]._id))
          }
        },
        error => {
          console.log(error);
        });
    this.subscriptions.push(subscription)
  }
/**
 * Calls the getEmployee() from service  and subscribes the result to an Employee object passed to the EmployeeDetails Component
 * HIDE button is made visible 
 */
  showEmployee(employeeId: string){
  
    var subscription =this.employeeService.getEmployee(employeeId)
      .subscribe((data)=>{
        
        this.selectedEmployee = new Employee(data.name,data.email, data.devices, data.id,  data._id)
        this.toggle="DETAILS"    
      })
    this.subscriptions.push(subscription)     
  }

/**
 * Calls the getEmployee() from service  and subscribes the result to an Employee object passed to the EmployeeForm Component 
 * EmployeeForm Component is made visible
 */
  editEmployee(employee: Employee){
    var subscription = this.employeeService.getEmployee(employee._id)
      .subscribe((data)=>{
        
        this.selectedEmployee = new Employee(data.name,data.email, data.devices, data.id, data._id)
        this.toggle="EDIT"    
      })   
    this.subscriptions.push(subscription)    
  }
/**
 * 
 * @param updateEmployee 
 * Runs after an update event is triggered from EmployeeForm Component
 * Updates the values of the Employee to the DOM
 */
  updateEmployeeList(updateEmployee:Employee){

    for(let i=0; i<this.employees.length;i++){
      if(this.employees[i]._id==updateEmployee._id){
      this.employees[i]._id=updateEmployee._id  
      this.employees[i].id=updateEmployee.id
      this.employees[i].name=updateEmployee.name
      this.employees[i].email=updateEmployee.email
      this.employees[i].devices=updateEmployee.devices
      
      }
    }
    this.close()
   
  }

/**
 * Calls the getEmployee() from service  and subscribes the result to an Employee object passed to the EmployeeDetails Component 
 * DELETE button is made visible
 */
  deleteEmployee(employeeId: string){
    var subscription = this.employeeService.getEmployee(employeeId)
      .subscribe((data)=>{
        this.selectedEmployee = new Employee(data.name,data.email, data.devices,data.id, data._id)
        this.toggle="DELETE"     
      })
    this.subscriptions.push(subscription)      
  }

  /**
   * 
   * @param id 
   * Calls the deleteEmployee() method from service and removes deleted value from DOM
   */
  confirmDelete(id:string){
    this.employeeService.deleteEmployee(id)
    // get index of object with id:id
    var removeIndex = this.employees.map(function(employee) { return employee._id; }).indexOf(id);
    // remove object
    this.employees.splice(removeIndex, 1);
    this.toggle="NONE"
  }

  /**
   * Hides all children components 
   */
  close(){
    this.toggle="NONE"
  }

  
  


}
