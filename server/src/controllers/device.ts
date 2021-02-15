import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { IDevice } from '../types/device';
import Device from '../models/device'
import mongoose from 'mongoose'

const NAMESPACE = 'Device Controller';

const getDevices = async (req:Request, res:Response, next: NextFunction): Promise<void> =>{
    logging.info(NAMESPACE, `GET route called`);
    try {
        const devices: IDevice[] = await Device.find();
        res.status(200).json(devices)
    } catch (error) {
        throw error;   
    }
}

const getDevice = async (req:Request, res:Response, next: NextFunction): Promise<void> =>{
  
    try {
        if( mongoose.Types.ObjectId.isValid(req.params.id) ) {
            //logging.error(NAMESPACE,'GET/{id} route error', req.params.id);
            const device: IDevice | null = await Device.findById(
                req.params.id
            ).populate('employeeId');
            res.status(200).json(
                device
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

const addDevice = async (req:Request, res:Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body as Pick<IDevice, "serialnumber"|"description"|"type"|"employeeId">
      
        console.log(body)
        const device: IDevice = new Device({
            serialnumber:body.serialnumber,
            description: body.description,
            type:body.type,
            employeeId:body.employeeId
          })
            const newDevice: IDevice = await device.save();
            //const allDevices: IDevice[] = await Device.find();
            res
            .status(201)
            .json({ message: "Device added", Device: newDevice/*, Devices: allDevices*/ })

    } catch (error) {
        throw error;
    }
}

const updateDevice = async (req:Request, res:Response): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req
        const updateDevice: IDevice | null = await Device.findByIdAndUpdate(
            {_id: id},
            body,
            { new: true }
        )
        //const allDevices: IDevice[] = await Device.find();
        res
        .status(200)
        .json(
            
            updateDevice,
           
        )
    } catch (error) {
        throw error;
    }
}

const deleteDevice = async (req: Request, res: Response): Promise<void> => {
      
    
    try {
      const deletedDevice: IDevice | null = await Device.findByIdAndRemove(
        req.params.id
      )
      const allDevices: IDevice[] = await Device.find()
      res.status(200).json({
        message: "Device deleted",
        device: deletedDevice,
        Devices: allDevices,
      })
    } catch (error) {
        throw error
    }
}

export { getDevices, getDevice, addDevice, updateDevice, deleteDevice};