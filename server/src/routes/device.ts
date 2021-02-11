import { Router} from "express"
import { getDevice, getDevices, addDevice, updateDevice, deleteDevice} from "../controllers/device"


const router: Router = Router()

router.get("/", getDevices)

router.get("/:id", getDevice)

router.post("/", addDevice)

router.put("/:id", updateDevice)

router.delete("/:id", deleteDevice)

export default router