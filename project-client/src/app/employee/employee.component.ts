import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:Employee[] = []
  selectedEmployee: Employee  = new Employee('','','');
  toggle:string ="NONE"
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          for(let key in data){
            
            this.employees.push(new Employee( data[key].id, data[key].name, data[key].email, data[key].devices,data[key]._id))
          }
          this.employeeService.setEmployeList(this.employees)
        },
        error => {
          console.log(error);
        });
  }

  //Makes an API call for Employee with selected value and shows the EmployeeDetails Component 
  showEmployee(employeeId: string){
  
    this.employeeService.getEmployee(employeeId)
      .subscribe((data)=>{
        
        this.selectedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id)
        this.toggle="DETAILS"    
      })     
  }
  editEmployee(employee: Employee){
    

    this.employeeService.getEmployee(employee._id)
      .subscribe((data)=>{
        
        this.selectedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id)
        this.toggle="EDIT"    
      })     
    
    
    
    
  }

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

  deleteEmployee(employeeId: string){
    this.employeeService.getEmployee(employeeId)
      .subscribe((data)=>{
        this.selectedEmployee = new Employee(data.id, data.name,data.email, data.devices, data._id)
        this.toggle="DELETE"     
      })     
  }

  confirmDelete(id:string){
  
    this.employeeService.deleteEmployee(id)
    // get index of object with id:id
    var removeIndex = this.employees.map(function(employee) { return employee._id; }).indexOf(id);
    // remove object
    this.employees.splice(removeIndex, 1);

    this.toggle="NONE"
    
  }

  close(){
    this.toggle="NONE"
  }

  
  


}
