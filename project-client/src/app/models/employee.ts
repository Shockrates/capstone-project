import { Optional } from "@angular/core";
import { Device } from "./device";

export class Employee {
    
    id:any;
    _id:any;
    name:string;
    email:string;
    devices:any[]
   
    constructor(id:any,_id:any, name:string,email:string, devices:Device[]=[]){
      
        this.id=id;
        this.name=name;
        this.email=email;
        this.devices=devices
        this._id = _id
    }
}

