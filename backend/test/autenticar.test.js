let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

let url = "http://localhost:8080";

describe('Logging in: ',()=>{
    it('should return a 200 status', (done) => {
    chai.request(url)
    .post('/autenticar')
    .send({usuario:"leo@gmail.com",contrasena: "1234"})
    .end( function(err,res){
    expect(res).to.have.status(200);
    done();
    });
    });
   });

describe('Logging in: ',()=>{
    it('should return a 500 status(user not found)', (done) => {
    chai.request(url)
    .post('/autenticar')
    .send({usuario:"no existe",contrasena: "no existe"})
    .end( function(err,res){
    expect(res).to.have.status(401);
    done();
    });
    });
   });