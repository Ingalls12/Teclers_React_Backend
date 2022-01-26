let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

let url = "http://localhost:8080";

describe('Creating a user ',()=>{
    it('should return a success response', (done) => {
    chai.request(url)
    .post('/crear_usuarios')
    .send({Username:"ll@gmail.com",LastName:"aa",FirstName:"Leonardo",Password:"1234",Country:"México",City:"cdmx"})
    .end( function(err,res){
    expect(res).to.have.status(200);
    done();
    });
    });
   });