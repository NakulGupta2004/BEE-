const express=require("express");
const cors=require("cors")
const bodyParser=require("body-parser")
const app=express();

let arrData=[];
app.use(cors());
app.use(bodyParser.json());


app.get("/showData",(req,res)=>{

    res.send(arrData);

})



app.post("/saveData", (req, res) => {
    const ilu = req.body;
    arrData.push(ilu);
    console.log("Data received and stored:", ilu);
    res.json({ message: "Data saved successfully!" });
});


app.listen(5000,()=>{
    console.log("Working");
    
})