import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
     
    })
  };
  //API Call to fetch all Employees from backend. Response contains assign devices _id only
  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:1337/employee'); 
  }

   //API Call to fetch one Employee with id from backend. Response contains assign devices details
  getEmployee(id:string):Observable<Employee>{
    return this.http.get<Employee>('http://localhost:1337/employee/'+id); 
  }

  //Creates new employee
  createEmployee(employee:Employee){
     this.http.post('http://localhost:1337/employee',employee.getJson()).subscribe((result) => console.log(result)); 
  }

  //Updates Employee. Its used to assign Devices to Employee
  updateEmployee(employee:Employee,id:string):Observable<Employee>{
    return this.http.put<Employee>('http://localhost:1337/employee/'+ id, employee.getJson())
  }

  //Deletes Employee
  deleteEmployee(id:string){
    this.http.delete('http://localhost:1337/employee/'+id)
      .subscribe((response)=>{
        //console.log(response)
      })
  }

  

  setEmployeList(list:Employee[]){
    this.employeesList=list
  }

  getEmployeeById(_id:string):any{
    return this.employeesList.find(e => e._id === _id)?.name;
  }
}
