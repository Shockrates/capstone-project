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
  employee?: Employee;
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }
  getAllEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          // this.employee = data;
          //console.log(data);
          for(let key in data){
            console.log(data[key]._id);
            this.employees.push(new Employee( data[key].id,data[key]._id, data[key].name, data[key].email, data[key].devices))
            }
        },
        error => {
          console.log(error);
        });
  }

}
