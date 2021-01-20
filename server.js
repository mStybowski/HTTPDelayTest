const express = require("express")
const app = express();
const cors = require("cors")

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let port = 8888;

app.use(cors())

function saveToCSV(array){



    let myArrayOfStrings = array.split(',');
    console.log(myArrayOfStrings);

    let arrayOfValues = myArrayOfStrings.map(function(x) {
        return {value:parseInt(x)}
    });

    console.log(arrayOfValues);

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'value', title: 'Value'}
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
        console.log(req.header("delays"))
        saveToCSV(req.header("delays"))
    }
})

app.listen(port, (err) => {
    if(!err)
        console.log(`Server has started at port ${port}!`)
})