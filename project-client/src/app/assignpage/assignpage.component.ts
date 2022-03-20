import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-assignpage',
  templateUrl: './assignpage.component.html',
  styleUrls: ['./assignpage.component.css']
})
export class AssignpageComponent implements OnInit {

  employees:Employee[]=[]
  selectedEmployee:Employee | any
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          for(let key in data){
            
            this.employees.push(new Employee( data[key].name, data[key].email, data[key].devices, data[key].id, data[key]._id))
          }
          //this.employeeService.setEmployeList(this.employees)
        },
        error => {
          console.log(error);
        });
  }

  chooseEmployee(id:string){
    this.employeeService.getEmployee(id)
      .subscribe((data)=>{
        this.selectedEmployee = new Employee(data.name,data.email, data.devices, data.id,  data._id)
      })     

  }

}
