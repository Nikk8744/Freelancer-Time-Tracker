import fs from 'fs';
import path from 'path'
import { readProjects, writeProjects } from './project.controller.js';

const logsFilePath = path.resolve('src', 'controllers', 'logs.json');

const readLogsFile = () => {
    try {
        const data = fs.readFileSync(logsFilePath);
        if(!data){
            return [];
        }
        // console.log(data)
        return JSON.parse(data);
    } catch (error) {
        console.log("Error occured whilke reading Logs file", error)
        return [];
    }
};

const writeLogsFile = (logs) => {
    try {
        const data = JSON.stringify(logs, null, 2);
        fs.writeFileSync(logsFilePath, data);
    } catch (error) {
        console.log("Error occured while writing in Logs file", error);
    }
}

let allLogs = readLogsFile();
let allProjects = readProjects();

const logTime = (req, res) => {
    const { projectId, description, timeSpent } = req.body;
    // const { userId } = req.user;

    const project = allProjects.find((proj) => proj.id === parseInt(projectId));
    if(!project){
        return res.status(404).json({ msg: "Project Not foundd"})
    }

    const newLogs = {
        id: allLogs.length + 1,
        projectId,
        description,
        timeSpent,
        timestamp: new Date(),
        // userId: req.user.id
    }
    allLogs.push(newLogs);
    writeLogsFile(allLogs);

    // agar proiject ke andar logs nhi hai to create karega
    if (!project.logs) {
        project.logs = []
    }
    project.logs.push(newLogs)
    writeProjects(allProjects); // idhar it will write or save 

    return res.status(200).json({
        newLogs,
        msg: "Logs added successfully!!",
    })
}

const getAllLogs = (req, res) => {
    return res.status(200).json({
        allLogs,
        msg: "All logs retrieved successfully!!",
    });
};
const getProjectLogs = (req, res) => {
    const { projectId } = req.params;

    const project = allProjects.find((proj) => proj.id === parseInt(projectId));
    if (!project) {
        return res.status(404).json({ msg: "No project found"})
    }

    const projLogs = project.logs;

    return res.status(200).json({
        projectLogs: projLogs || [],
        msg: "Project logs retrieved successfully!!",
    });
};

export {
    logTime,
    getAllLogs,
    getProjectLogs,
}