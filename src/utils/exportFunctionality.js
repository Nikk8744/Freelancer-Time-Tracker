import { parse } from 'json2csv';
import fs from 'fs';
import path from 'path';
import { readLogsFile } from '../controllers/timeLogs.controller.js';
import PDFDocument from 'pdfkit'

const exportCSVPath = path.resolve('src', 'controllers', 'logsExport.csv');

const exportInCsv = (req, res) => {
try {
        const logs = readLogsFile();
        const csv = parse(logs, {flatten:true});
    
        fs.writeFileSync(exportCSVPath,csv,'utf-8')
    
        res.header('Content-Type', 'text/csv');
        res.attachment('logsExport.csv');
        // res.send("The CSV File has been created successfyully you can download it!!");
        res.send(csv)

         /* 
         - here i can implement this also, it will then provde user a link in return msg in line 33-34 when clicked on that it will hit this endpoint
         - need to put this in summary route
        router.get('/summary/export-download', (req, res) => {
            const filePath = path.resolve('src', 'controllers', 'logsExport.csv');
            res.download(filePath, 'logsExport.csv', (err) => {
                if (err) {
                    return res.status(500).json({ msg: "Error occurred while downloading the CSV file." });
                }
            });
        });
        */
        console.log("Tghe csv file has been created and downloaded successfully!!!");
    
        return res.status(200).json({
            msg: "The CSV File has been created successfyully you can download it!!"
        })
} catch (error) {
    // console.log("Error occurred while creating csv file: ", error);
    return res.status(500).json({msg: "Error occurred while exporting logs data to csv file,."})
}
}

const exportPDFPath = path.resolve('src', 'controllers', 'logsExport.pdf');

const exportINPdf = (req, res) => {
    try {
        const logs = readLogsFile();
        const doc = new PDFDocument();
        // console.log(logs)
        doc.pipe(fs.createWriteStream(exportPDFPath));
    
        doc.fontSize(27).text("Time logs export in pdf", 100, 100);
        logs.forEach(log => {
            doc.fontSize(15).text(`Project ID: ${log.projectId}`, {continued: true});
            doc.text(` - Description: ${log.description}`);
            doc.text(`Time Spent: ${log.timeSpent} hours`);
            doc.text(`Timestamp: ${new Date(log.timestamp).toLocaleString()}`);
            doc.text('-------------------------------------');
        });
    
        doc.end();

        // doc.on('finish', () => {
        //     // Set headers to prompt the file download in the client
        //     res.header('Content-Type', 'application/pdf');
        //     res.attachment('logsExport.pdf'); // The name of the PDF file to be downloaded
        //     res.sendF(exportPDFPath); // Send the generated PDF to the client
    
        //     console.log("The PDF file has been created and downloaded successfully!!!");
    
        //     // Respond with a success message
        //     return res.status(200).json({
        //         msg: "The PDF file has been created successfully. It is now being downloaded."
        //     });
        // });
        return res.status(200).json({
            msg: "The PDF file has been created successfully. It is now being downloaded."
        });

    } catch (error) {
        return res.status(500).json({ msg: "Error occurred while exporting logs data to csv file"});
    }
}

export {
    exportInCsv,
    exportINPdf
};