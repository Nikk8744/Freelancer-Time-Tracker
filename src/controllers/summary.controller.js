import fs from 'fs';
import path from 'path'
import { readLogsFile } from './timeLogs.controller.js';
import { start } from 'repl';

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

const getTotalHoursForRange = (req, res) => {
    const logs = readLogsFile();
    const {startDate, endDate } = req.query;
    // if this was a post or put req then we would have used req.body as this is a get req we use req.query, so we need to parse the query string to get the values of the query parameters
    // const { startDate, endDate } = req.body; 
    if(!startDate || !endDate){
        return res.status(400).json({ msg: "You need to provide bothn start and end dates" });
    }

    // convert the query parameters(startDate, endDate) which are in string to date objects as its easy to compare date obnjet with date
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalHours = 0;

    // filter the logs array to get the logs that fall within the given date range
    logs.forEach(log => {
        const logDate = new Date(log.timestamp);
        if(start <= logDate && end >= logDate){
            totalHours += parseInt(log.timeSpent) 
        }
    });
    const summary = { totalHours, startDate, endDate };
    writeSummaryFile(summary);

    if (totalHours == 0) {
        return res.status(200).json({
            totalHours,
            msg: "Hours fetched successfully, But No logs found for the given date range!!!",
        })
    }

    return res.status(200).json({
        totalHours,
        msg: "Total hours for the given date range calculated successfully!!!",
    })
}   

export {
    totalHoursPerPorject,
    getTotalHoursForRange
}