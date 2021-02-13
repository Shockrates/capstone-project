import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceFormComponent } from './device/device-form/device-form.component';
import { DeviceComponent } from './device/device.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent  },
  { path: 'device', component: DeviceComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'device-form', component: DeviceFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
