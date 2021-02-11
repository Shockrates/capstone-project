import {Document} from "mongoose";
import { IDevice } from "./device";

export interface IEmployee extends Document{
    id: number,
    name: string,
    email:string
    devices?:[IDevice]
}