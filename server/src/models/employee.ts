import {IEmployee} from "../types/employee"
import {ICounter} from "../types/counter"
import counter from "./counter"
import {CallbackError, model, Schema} from "mongoose"


const employeeSchema: Schema = new Schema(
    {   
        id: {
            type: Number,
            //required: true,
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



// employeeSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error: CallbackError | undefined, counter: any)   {
//         if(error)
//             return next(error);
//         doc.id = counter!.seq;
//         next();
//     });
// });

export default model<IEmployee>("Employeer",employeeSchema)