import {DeviceType} from "./devicetypes"
export class Device {
    
    _id:string;
    serialnumber:string;
    description:string;
    type:any;
    employeeId?:any
   
    constructor(_id:string, serialnumber:string,description:string,type:number,employeeId:any){
      
        this._id=_id;
        this.serialnumber=serialnumber;
        this.description=description;
        this.type=DeviceType[type],
        this.employeeId=employeeId
    }  
}
