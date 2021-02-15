import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignpageComponent } from './assignpage/assignpage.component';
import { DeviceFormComponent } from './device/device-form/device-form.component';
import { DeviceComponent } from './device/device.component';
import { AssignComponent } from './employee/assign/assign.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent}, 
  { path: 'device', component: DeviceComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'device-form', component: DeviceFormComponent },
  { path: 'assign-device/:id', component: AssignComponent },
  { path: 'assign', component: AssignpageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
