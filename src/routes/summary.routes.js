import { Router } from "express"
import { totalHoursPerPorject } from "../controllers/summary.controller.js";

const router = Router();

router.route("/totalHoursPerProject").get(totalHoursPerPorject)

export default router;