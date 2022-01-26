let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

let url = "http://localhost:8080";

describe('Getting a user: ',()=>{
    it('should return a user', (done) => {
    chai.request(url)
    .post('/usuarios')
    .send({FirstName:"Leonardo"})
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   describe('Getting a user: ',()=>{
    it('should receive an error', (done) => {
    chai.request(url)
    .post('/usuarios')
    .send({FirstName:null})
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(500);
    done();
    });
    });
   });
   
   
   