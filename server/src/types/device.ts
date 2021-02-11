import {Document} from "mongoose";

export interface IDevice extends Document{
    serialnumber: string,
    description: string,
    type:number
    employeeId:number
}