import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesList:Employee[]=[]
  
  constructor(private http: HttpClient) { }
  //baseUrl: String = 'http://localhost:9090/authors/'
  baseUrl: String = 'http://localhost:1337/employee/'
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
     
    })
  };
  //API Call to fetch all Employees from backend. Response contains assign devices _id only
  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}`); 
  }

   //API Call to fetch one Employee with id from backend. Response contains assign devices details
  getEmployee(id:string):Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}`+id); 
  }

  //Creates new employee
  createEmployee(employee:Employee):Observable<Employee> {
     return this.http.post<Employee>(`${this.baseUrl}`,employee.getJson()); 
  }

  //Updates Employee. Its used to assign Devices to Employee
  updateEmployee(employee:Employee,id:string):Observable<Employee>{
    return this.http.put<Employee>(`${this.baseUrl}`+ id, employee.getJson())
  }

  //Deletes Employee
  deleteEmployee(id:string){
    this.http.delete(`${this.baseUrl}`+id)
      .subscribe((response)=>{
        //console.log(response)
      })
  }

  

  // setEmployeList(){
  //   /**
  //  * Calls the getAllEmployees() from service and subscribes the result  to an Employee List
  //  */
  //   this.getAllEmployees()
  //     .subscribe(
  //       (data) => {
  //         for(let key in data){
  //           this.employeesList.push(new Employee( data[key].name, data[key].email, data[key].devices, data[key].id, data[key]._id))
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // getEmployeesList(){
  //   return this.employeesList;
  // }


}
