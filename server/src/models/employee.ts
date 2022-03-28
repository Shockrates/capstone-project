import {IEmployee} from "../types/employee"
import Counter from "./counter"
import {CallbackError, model, Schema} from "mongoose"
import { ICounter } from "../types/counter";


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


// employeeSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { sequence_value: 1} }, (error: CallbackError, counter) =>  {
//         if(error)
//             return next(error);
//         if (counter) {
//             doc.id = counter.sequence_value;
//         }
//         next();
//     });
// });


employeeSchema.pre('save', function(next) {
    var doc = this;

    Counter.findByIdAndUpdate({_id: 'employeeId'}, {$inc: { sequence_value: 1} }, {new: true})
    .then((counter) => {
        if (counter) {
            doc.id = counter.sequence_value;
        } else {
            const newCounter: ICounter = new Counter({
                _id: 'employeeId',
                sequence_value: 1
            })
            newCounter.save();
            doc.id = newCounter.sequence_value;
        }
        next();
    })
    
});

export default model<IEmployee>("Employeer",employeeSchema)