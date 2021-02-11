import { Router} from "express"
import { getEmployee, getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../controllers/employee"


const router: Router = Router()

router.get("/", getEmployees)

router.get("/:id", getEmployee)

router.post("/", addEmployee)

router.put("/:id", updateEmployee)

router.delete("/:id", deleteEmployee)

export default router