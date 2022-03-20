import {model, Schema} from "mongoose";

const employeeIdSchema: Schema = new Schema(
    {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

export default model("EmployeeId",employeeIdSchema)