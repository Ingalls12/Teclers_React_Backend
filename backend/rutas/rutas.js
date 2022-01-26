const express = require("express");
let router = express.Router();
const sequel = require("./sequel");
const jwt = require("jsonwebtoken")

const Logged = express.Router()
Logged.use((req, res, next) => {
    const token = req.headers['access-token'];
    console.log(req.headers)
    console.log("el token es " + token);
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'No se ha recibido un Token.' 
      });
    }
 });
 router.get("/usuarios",(req,res)=>{
    let query = `SELECT UserID,Username,FirstName FROM users `;

    sequel.query(query,{type:sequel.QueryTypes.SELECT})
    .then(datos=>{
        console.log(datos);
        res.status(200).json({
            msg:"Consulta ejecutada con exito",
            data:datos
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:"Hubo un error"
        })
    })
})

router.post("/usuarios",(req,res)=>{
    let query = `SELECT UserID,Username,FirstName FROM users WHERE FirstName LIKE "${req.body.FirstName}";`;

    sequel.query(query,{type:sequel.QueryTypes.SELECT})
    .then(datos=>{
        let usuario = datos;
     
        console.log(usuario,"prueba usuarios post");
        if(usuario.length==0){
            res.status(500).json({
                error:"No se encontro el usuario"
            })
        }else{
            res.status(200).json({
                msg:"Consulta ejecutada con exito",
                data:usuario
            })
        }
       
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
    let query = `SELECT * FROM users WHERE Username = "${req.body.usuario}" AND Password = "${req.body.contrasena}" `;
    sequel.query(query,{type:sequel.QueryTypes.SELECT})
        .then(datos=>{
            console.log(datos)
            try{
                if(datos[0].UserID){
                    console.log("Si existe este usuario")
                    const payload = {LogIn:  true, ID:datos[0].UserID,Name: datos[0].FirstName };
                    const token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});
                    
                    res.status(200).json({
                        mensaje: 'Autenticación correcta',
                        token: token,
                        usuarioID: payload.ID,
                        usuario: payload.Name,
                        Logged: true

                    });
                }
            }catch(e){
                console.log("Usuario no encontrado")
                res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"})
            }
        })
})
router.get("/publicaciones",Logged,(req,res)=>{
    let query = `SELECT * publications`;
    sequel.query(query,{type:sequel.QueryTypes.SELECT})
    .then(datos=>{
        res.status(200).json({
            mensaje:"Peticion completada con exito",
            datos:datos
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:"Error Consulta  no ejecutada"
        })
    })
})
router.post("/publicaciones",Logged,(req, res)=>{
    let query = `INSERT INTO publications (UserID, Content, PublicationDate)VALUES("${req.body.UserID}", "${req.body.Content}", "${req.body.PublicactionDate}")`;
    sequel.query(query,{type:sequel.QueryTypes.INSERT})
    .then(datos=>{

        res.status(200).json({
            mensaje:"Publicacion publicada",
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:"Publicacion no publicada"
        })
    })
})


router.post("/crear_usuarios",(req,res)=>{

    let query = `INSERT INTO users (Username,LastName,FirstName,Password,Country,City)VALUES("${req.body.Username}","${req.body.LastName}","${req.body.FirstName}","${req.body.Password}","${req.body.Country}","${req.body.City}")`;
    console.log(query)
    sequel.query(query,{type:sequel.QueryTypes.INSERT})
    .then(datos=>{
        console.log(datos)
        let usuario = datos;
        console.log(usuario);
        const payload = {LogIn:  true, ID:datos.UserID,Name: req.body.FirstName };
        const token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});
        res.status(200).json({
            mensaje: 'Autenticación correcta',
            token: token
        
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
