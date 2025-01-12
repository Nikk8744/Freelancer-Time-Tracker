import fs from 'fs';
import path from 'path'
import { readLogsFile } from './timeLogs.controller.js';

const projectsFilePath = path.resolve('src', 'controllers', 'projects.json');
const summaryFilePath = path.resolve('src', 'controllers', 'summary.json');

const readProjectsFile = () => {
    try {
        const data = fs.readFileSync(projectsFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.log("Error while reading project file", error)
        return []
    }
};

const writeSummaryFile = (summary) => {
    try {
        const data = JSON.stringify(summary, null, 2);
        fs.writeFileSync(summaryFilePath, data);
    } catch (error) {
        console.log("Error while writing summary file", error);
    }
}

const totalHoursPerPorject = (req, res) => {
    const logs = readLogsFile();
    const allProjects = readProjectsFile()

    const totalHours = {};

    allProjects.forEach(project => {
        totalHours[project.id] = 0;
    });

    logs.forEach(log => {
        const projectId = log.projectId;
        const timeSpent = parseFloat(log.timeSpent);

        if(!totalHours[projectId]){
            totalHours[projectId] = 0
        }

        totalHours[projectId] += timeSpent;
    });

    const summary = { totalHours };
    writeSummaryFile(summary);

    return res.status(200).json({
        totalHours,
        msg: "Total hours per project calculated successfully!!!",
    })
};

export {
    totalHoursPerPorject,
}