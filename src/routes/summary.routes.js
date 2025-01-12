import { Router } from "express"
import { getTotalHoursForRange, totalHoursPerPorject } from "../controllers/summary.controller.js";

const router = Router();

router.route("/totalHoursPerProject").get(totalHoursPerPorject)
router.route("/totalHoursForDateRange").get(getTotalHoursForRange)

export default router;