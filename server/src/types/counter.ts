import {Document} from "mongoose";

export interface ICounter extends Document{
    _id: string,
    seq:number
}