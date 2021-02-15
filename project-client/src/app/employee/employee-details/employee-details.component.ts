import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: any;
  
 

  constructor(){

  }

  ngOnInit(): void {
  }

  
  
  



}
