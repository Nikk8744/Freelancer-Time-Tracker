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



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);   
})