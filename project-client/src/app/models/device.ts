import {DeviceType} from "./devicetypes"

export class Device {
    
    
    serialnumber:string;
    description:string;
    type:any;
    _id:any;
    employeeId?:any
   
    constructor(serialnumber:string,description:string,type:number,_id?:any, employeeId=null){
      
        this._id=_id;
        this.serialnumber=serialnumber;
        this.description=description;
        this.type=DeviceType[type],
        this.employeeId=employeeId
    }
    
    getJson(){
        return{
            "serialnumber":this.serialnumber,
            "description":this.description,
            "type":DeviceType[this.type],
            "employeeId":this.employeeId  
        }
    }

    getTypeCode(){
        return DeviceType[this.type]
    }
}
