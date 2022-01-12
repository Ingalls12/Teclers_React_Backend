const Sequelize = require('sequelize');
const path = `mysql://root@localhost:3306/${process.env.DATA_BASE}`;
//const sequelize = new Sequelize(path,{operatorsAliases: 1});
console.log(process.env.DATA_BASE);
const sequelize = new Sequelize(process.env.DATA_BASE,"root","",{
    dialect:"mysql",
    storage:path
})
sequelize.authenticate().then(()=>{
    console.log("Conexion exitosa a base de datos");
}).catch(err=>{
    console.log("error",err)
})
module.exports = sequelize;