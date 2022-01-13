const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const config = {
	llave : process.env.SECRETO
};


function logger(req,res,next){
    console.log("Request received: ",req.protocol);
    next();
}
app = express();
app.use(logger)
app.use(express.json())
const cors = require("cors");
app.set("llave",config.llave)
app.use(cors({"origin":"*","methods":"GET,POST"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(8080,()=>{
    console.log("Se inicio el servidor");
})


app.use("/",require("./rutas/rutas"));

app.use((req,res,next)=>{//Middleware final para manejo de 
    res.status(404).json({
        msg:'Tu solicitud no se puede atender en este momento!',
        err:'endpoint no existente'
    });
});
app.use((err, req, res, next)=> {//Middleware para el manejo de errores del sistema
    console.error("Error del sisetema --> ",err.stack);
    res.status(500).json({
        msg:'Error del sistema, tu solicitud no se puede atender en este momento!',
        error:err
    });
});
