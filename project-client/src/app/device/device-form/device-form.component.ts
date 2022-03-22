import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceType } from 'src/app/models/devicetypes';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

  @Input() 
  device: Device = new Device('','',-1);
 
  @Input() toggle: any="CREATE";

  @Output() emitDevice=new EventEmitter();
  deviceForm: FormGroup | any;

  enumKeys:any = [];
  types = DeviceType;

  constructor(private fb: FormBuilder, private deviceService: DeviceService,private router: Router) {
    
    this.enumKeys = Object.keys(this.types).filter(f => !isNaN(Number(f)))
    this.deviceForm = this.fb.group({
      serialnumber:['', Validators.compose(
        [Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(255),
        RxwebValidators.unique()
      ]
        )],
      description:['', Validators.compose(
        [Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(255)]
        )],
      type: ['', Validators.required],
    
    })    
  }
  
  ngOnInit(): void {
    this.populateDeviceForm()
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'device'**************/
    this.populateDeviceForm()
    
   
    }   

  populateDeviceForm(){
    this.deviceForm.get('serialnumber').setValue(this.device.serialnumber)
    this.deviceForm.get('description').setValue(this.device.description)
    this.deviceForm.get('type').setValue(this.device.type)

  
  }

  submitDevice(){
    console.log(this.deviceForm)
    if (this.toggle=="CREATE") {
      this.createDevice();
      this.router.navigate(['device']);
    } else {
      this.updateDevice();
    }
  }

  createDevice(){

    const device: Device = new Device(
      this.deviceForm.get('serialnumber').value,
      this.deviceForm.get('description').value,
      this.deviceForm.get('type').value,
      
      
    ); 
    this.deviceService.createDevice(device)
  }

  //Ta
  updateDevice():void {
    console.log(this.deviceForm.get('serialnumber').value)
    console.log(this.deviceForm.get('description').value)
    console.log(this.deviceForm.get('type').value)
    console.log(this.device._id)

    const device: Device = new Device(
      this.deviceForm.get('serialnumber').value,
      this.deviceForm.get('description').value,
      this.deviceForm.get('type').value,
      this.device._id,
      this.device.employeeId
      
    ); 
    this.deviceService.updateDevice(device,this.device._id)
      .subscribe((data)=>{
        const updatedDevice = new Device(data.serialnumber, data.description,data.type, data._id, data.employeeId);
        this.emitDevice.emit(updatedDevice);
          
    })     
    
  }

}
