import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { DeviceComponent } from './device/device.component';
import { EmployeeService } from './services/employee.service';
import { DeviceService } from './services/device.service';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { HeaderComponent } from './header/header.component';
import { DeviceFormComponent } from './device/device-form/device-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { DevicedetailsComponent } from './device/devicedetails/devicedetails.component';
import { AssignComponent } from './employee/assign/assign.component';
import { AssignpageComponent } from './assignpage/assignpage.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DeviceComponent,
    EmployeeFormComponent,
    HeaderComponent,
    DeviceFormComponent,
    EmployeeDetailsComponent,
    DevicedetailsComponent,
    AssignComponent,
    AssignpageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService,DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
