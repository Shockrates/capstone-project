import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesList:Employee[]=[]
  emmploye?:Employee
  constructor(private http: HttpClient) { }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:1337/employee'); 
  }

  setEmployeList(list:Employee[]){
    this.employeesList=list
  }

  getEmployeeById(_id:string):any{
    return this.employeesList.find(e => e._id === _id)?.name;
  }
}
