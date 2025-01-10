import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/project.controller.js";

const router = Router();

router.route("/createProject").post(createProject);

router.route("/getProject/:id").get(getProject);
router.route("/getAllProject").get(getAllProjects);

router.route("/updateProject/:id").patch(updateProject);

router.route("/deleteProject/:id").delete(deleteProject);

export default router;