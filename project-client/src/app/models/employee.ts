export class Employee {
    
    id:any;
    _id:any;
    name:string;
    email:string;
    devices:any[]
   
    constructor(id:any,_id:any, name:string,email:string,devices:any[]){
      
        this.id=id;
        this.name=name;
        this.email=email;
        this.devices=devices
        this._id = _id
    }
}

