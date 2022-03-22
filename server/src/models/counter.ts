import {model, Schema} from "mongoose"
import {ICounter} from "../types/counter"

const counterSchema: Schema  = new Schema(
    {
        _id: {
                type: String, 
                required: true
            },
        sequence_value: { 
                type: Number, 
                default: 0 
            }
    });

export default model<ICounter>("counter",counterSchema);

