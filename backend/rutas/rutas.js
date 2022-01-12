const express = require("express");
let router = express.Router();
const sequel = require("./sequel");




router.post("/usuarios",(req,res)=>{
    let query = `SELECT * FROM users WHERE FirstName LIKE "${req.body.FirstName}";`;

    sequel.query(query,{type:sequel.QueryTypes.SELECT})
    .then(datos=>{
        let usuario = datos;
        console.log(usuario);
        res.status(200).json({
            msg:"Consulta ejecutada con exito",
            data:usuario
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:"No se encontro el usuario"
        })
    })
})

router.post("/crear_usuarios",(req,res)=>{

    let query = `INSERT INTO users (Username,LastName,FirstName,Password,Country,City)VALUES("${req.body.Username}","${req.body.LastName}","${req.body.FirstName}","${req.body.Password}","${req.body.Country}","${req.body.City}")`;
    console.log(query)
    sequel.query(query,{type:sequel.QueryTypes.INSERT})
    .then(datos=>{
        let usuario = datos;
        console.log(usuario);
        res.status(200).json({
            msg:"Consulta ejecutada con exito",
            data:"Se agrego el usuario"
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:"Error Consulta  no ejecutada"
        })
    })
})
module.exports=router;
