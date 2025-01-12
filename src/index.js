import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
// import { createServer } from 'http';

const app = express();
// const server = createServer(app);

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// all routes
import projectRoutes from './routes/project.routes.js'
import logRoutes from './routes/timeLogs.routes.js'
import summaryRoutes from './routes/summary.routes.js'

// routes udage
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/logs", logRoutes);
app.use("/api/v1/summary", summaryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);   
})