const express = require("express");
let router = express.Router();
const sequel = require("./sequel");
const jwt = require("jsonwebtoken")



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

app.post('/autenticar', (req, res) => {
    
    console.log("usuario: " + req.body.usuario + " contrasena: " + req.body.contrasena)

    if(req.body.usuario === "tecler" && req.body.contrasena === "holatecler") {
        const payload = {LogIn:  true, };
		const token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});
        
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
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
