const express = require("express")
const app = express();
const cors = require("cors")

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let port = 8888;

app.use(cors())

function generateCSV(array){
    let myArrayOfStrings = array.split(',');
    let arrayOfValues = myArrayOfStrings.map(function(x) {
        return {value:parseInt(x)}
    });
    
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'value', title: 'Time [ms]'}
        ]
    });
    
    csvWriter
        .writeRecords(arrayOfValues)
        .then(()=> console.log('The CSV file was written successfully'));
}

app.get("/test", (req, res) =>{

    res.send(req.header("myHeader"))
    console.log("HEADER: " + req.header("myHeader"));

    if(req.header("delays")){
        generateCSV(req.header("delays"))
    }
})

app.listen(port, (err) => {
    if(!err)
        console.log(`Server has started at port ${port}!`)
})
