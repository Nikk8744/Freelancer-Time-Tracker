import { Router } from "express"
import {  getTotalHoursForRange, totalHoursPerPorject } from "../controllers/summary.controller.js";
import { exportInCsv, exportINPdf } from "../utils/exportFunctionality.js";

const router = Router();

router.route("/totalHoursPerProject").get(totalHoursPerPorject)
router.route("/totalHoursForDateRange").get(getTotalHoursForRange)

router.route("/export").get(exportInCsv)
router.route("/exportInPdf").get(exportINPdf)

export default router;