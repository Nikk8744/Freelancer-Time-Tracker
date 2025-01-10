import fs from 'fs';
import path from 'path'

// let allProjects = [
//     {
//         "id": 1,
//         "name": "Project 1",
//         "description": "This is project 1",
//         startDate: "2020-01-01",    
//         endDate: "2020-01-31",
//     },
// ];

// const projectFilePath = path.join((new URL('.', import.meta.url).pathname), 'projects.json') 
const projectFilePath = path.resolve('src', 'controllers', 'projects.json') 

const readProjects = () => {

    try {
        const data = fs.readFileSync(projectFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.log("Error while reading form file", error)
        return [];
    }
}

const writeProjects = (projects) => {
    try {
        const data = JSON.stringify(projects, null, 2);
        fs.writeFileSync(projectFilePath, data);
    } catch (error) {
        console.log("Error occured while writing to file", error);
    }
}

const allProjects = readProjects();

const createProject = (req, res) => {
    const { name, description, startDate, endDate } = req.body;

    try {
        // const allProjects = readProjects(); // ye read karega projects.json file nd usme se sbb data layega
        const existingProject = allProjects.find((proj) => proj.name === name);
        if(existingProject){
            return res.status(400).json({ msg: "Project already exists" });
        }
    
        const newProject = {
            id: allProjects.length + 1,
            name,
            description,
            startDate,
            endDate,
            createdAt: new Date().toISOString()
        };
    
        allProjects.push(newProject);
        writeProjects(allProjects);

        // console.log(allProjects)
    
        return res.status(201).json({
            newProject,
            msg: "New Project Created Successfully!!!!"
        });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error while creating" });
        // next(error) // ye ek function hai express jo used to pass the error to the next middleware, ye future mai use kr skta agar error handling midderware banau toh.
    }
};

const getProject = (req, res) => {
    const { id } = req.params;

    try {
        // const allProjects = readProjects();
        const project = allProjects.find((proj) => proj.id === parseInt(id));
        if(!project){
            return res.status(404).json({ msg: "Project not foundddd" });
        }

    
        return res.status(200).json({
            project,
            msg: "Project found successfully!!",
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error while fetching project" });
    }
};

const getAllProjects = (req, res) => {

    // const allProjects = readProjects();

    // idhar when authentication is implemented , then we will only show the projects of the logged in user.
    return res.status(200).json({
        allProjects,
        msg: "All projects fetched successfully"
    });
};

const updateProject = (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;

    try {
        // const allProjects = readProjects();
        const project = allProjects.find((proj) => proj.id === parseInt(id));
        if(!project){
            return res.status(404).json({ msg: "Project Not Found yrr"})
        };
    
        const updatedProject = {
            id: project.id,
            name: name || project.name,
            description: description || project.description,
            startDate: startDate || project.startDate,
            endDate: endDate || project.endDate,
            updatedAt: new Date().toISOString(),
        };
    
        allProjects[id-1] = updatedProject;
        writeProjects(allProjects);

        return res.status(200).json({
            updatedProject,
            msg: "Project Updated Successfully!!",
        });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error while updating yout project" });
    }
}

const deleteProject = (req, res) => {
    const { id }  = req.params;

    try {
        // const allProjects = readProjects();
        const project = allProjects.find((proj) => proj.id === parseInt(id));
        if(!project){
            return res.status(404).json({ msg: "Project Not Found" });
        }
        
        const index = allProjects.indexOf(project);
        allProjects.splice(index, 1);
        writeProjects(allProjects);
    
        return res.status(200).json({
            msg: "Yoyur Project has been deleted Successfyully!!"
        });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error while deleting your project"})
    }
}


export {
    createProject,
    getProject,
    getAllProjects,
    updateProject,
    deleteProject,
    readProjects,
    writeProjects,
}