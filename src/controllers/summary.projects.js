import fs from 'fs';
import path from 'path'

const logsFilePath = path.resolve('src', 'controllers', 'logs.json');
const projectsFilePath = path.resolve('src', 'controllers', 'projects.json');

const readLogsFile = () => {
    try {
        const data = fs.readFileSync(logsFilePath)
        return JSON.parse(data)
    } catch (error) {
        console.log("Error while Reading logs file", error)
        return [];
    }
};

const readProjectsFile = () => {
    try {
        const data = fs.readFileSync(projectsFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.log("Error while reading project file", error)
        return []
    }
}

const totalHoursPerPorject = (req, res) => {
    const logs = readLogsFile()
    const projects = readProjectsFile()

    const totalHours = {};
}