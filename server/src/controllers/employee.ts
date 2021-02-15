import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { IEmployee } from '../types/employee';
import Employee from '../models/employee'
import mongoose from 'mongoose'
import { IDevice } from '../types/device';

const NAMESPACE = 'User Controller';


/**
 * Returns all Employees
 * @param req 
 * @param res 
 * @param next 
 * 
 */
const getEmployees = async (req:Request, res:Response, next: NextFunction): Promise<void> =>{
    logging.info(NAMESPACE, `GET route called`);
    try {
        const employees: IEmployee[] = await Employee.find();
        res.status(200).json(employees)
    } catch (error) {
        throw error;   
    }
}

/**
 * @param req 
 * @param res 
 * @param next 
 * Returns a single Employee with id = :id
 */
const getEmployee = async (req:Request, res:Response, next: NextFunction): Promise<void> =>{
  
    try {
        if( mongoose.Types.ObjectId.isValid(req.params.id) ) {
            //logging.error(NAMESPACE,'GET/{id} route error', req.params.id);
            const employee: IEmployee | null = await Employee.findById(
                req.params.id
            );
            const employeeDevices = await Employee.findById(
                req.params.id
            ).populate("devices");
            res.status(200).json(
                //employee
                employeeDevices
            );
        }else{
            res.status(200).json({
                message: "Invalid Id"
            });
        }
        

    } catch (error) {
        throw logging.error(NAMESPACE,'GET/{id} route error', error);   
        
    }
}

const addEmployee = async (req:Request, res:Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, `POST route called`);
    try {
        const body = req.body as Pick<IEmployee, "id"|"name"|"email"|"devices">
      
        console.log(body)
        const employee: IEmployee = new Employee({
            id:body.id,
            name: body.name,
            email:body.email,
            devices:body.devices
          })
            const newEmployee: IEmployee = await employee.save();
            //const allUsers: IEmployee[] = await Employee.find();
            res
            .status(201)
            .json({ message: "User added", User: newEmployee/*, Users: allUsers*/ })

    } catch (error) {
        throw error;
    }
}


const updateEmployee = async (req:Request, res:Response): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req
        
        
        const updateEmployee: IEmployee | null = await Employee.findByIdAndUpdate(
            {_id: id},
            body,
            { new: true }
        ).populate("devices")
      
        res
        .status(200)
        .json(
            
            updateEmployee
            
        )
    } catch (error) {
        throw error;
    }
}

const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
      
    
    try {
      const deletedEmployee: IEmployee | null = await Employee.findByIdAndRemove(
        req.params.id
      )
      const allEmployees: IEmployee[] = await Employee.find()
      res.status(200).json({
        message: "Employee deleted",
        employee: deletedEmployee,
        Employees: allEmployees,
      })
    } catch (error) {
        throw error
    }
}

export { getEmployee, getEmployees, addEmployee, updateEmployee, deleteEmployee };
