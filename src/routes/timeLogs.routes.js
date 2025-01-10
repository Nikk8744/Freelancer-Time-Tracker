import { Router } from "express";
import { getAllLogs, getProjectLogs, logTime } from "../controllers/timeLogs.controller.js";
import { getAllProjects } from "../controllers/project.controller.js";

const router = Router();

router.route("/logTime").post(logTime)

router.route("/allLogs").get(getAllLogs)
router.route("/projectLogs/:projectId").get(getProjectLogs)

export default router;