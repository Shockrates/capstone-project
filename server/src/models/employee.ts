import {IEmployee} from "../types/employee"
import {model, Schema} from "mongoose"

const employeeSchema: Schema = new Schema(
    {   
        id: {
            type: Number,
            required: true,
            unique:true
       
        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
            minlength:3,

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        devices: [
            {
              type: Schema.Types.ObjectId,
              ref: "Device"
            }
          ]
        
    },
    {
        timestamps: true
    }
    
)
// employeeSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   })

export default model<IEmployee>("Employeer",employeeSchema)