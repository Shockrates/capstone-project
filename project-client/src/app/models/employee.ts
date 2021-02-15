import { Optional } from "@angular/core";
import { Device } from "./device";

export class Employee {
    
    id:any;
    _id:any;
    name:string;
    email:string;
    devices:any[]
   
    constructor(id:any, name:string,email:string, devices:Device[]=[],_id?:any){
      
        this.id=id;
        this.name=name;
        this.email=email;
        this.devices=devices
        this._id = _id
    }

    getJson(){
        const deviceIds:string[]=[]
        this.devices.forEach(device => {
            deviceIds.push(device._id)
        })
        return{
            "id":this.id,
            "name":this.name,
            "email":this.email,
           "devices":deviceIds  
        }
    }

    
}

