const express = require("express")
const app = express();
const cors = require("cors")

let port = 8888;

app.use(cors())

app.get("/test", (req, res) =>{

    res.send(req.header("myHeader"))
    console.log("HEADER: " + req.header("myHeader"));
})

app.listen(port, (err) => {
    if(!err)
        console.log(`Server has started at port ${port}!`)
})