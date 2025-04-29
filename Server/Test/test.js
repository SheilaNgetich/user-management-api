import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('userRoutes',()=>{
// Variable to store user ID for testing
let testUserId;
    // test for creating a user
     describe('POST /users',()=>{
        it("should create a new user",(done)=>{
            chai.request(app)
            .post('/users')
            .send({
                name: "New User",
            })
            .end((err, res) => {
                expect(res).to.have.status(201); 
                expect(res.body).to.be.an('object');
                // Store the created user ID for subsequent tests
                testUserId = res.body.id || res.body._id;
                done(); 
              });
        });
     });

    //test for getting all users
    describe('GET /users',()=>{
        it('should get all users',(done)=>{
            chai.request(app)
            .get('/users')
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('array');
                done(); 
              });
        });
    });

    //test for searching for a user
    describe('GET /users/search/:name',()=>{
        it('should search for a user',(done)=>{
            chai.request(app)
            .get('/users/search/New User')
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('array');
                done(); 
              });
        });
    });

    //test for updating a user
    describe('PATCH /users/search/:name',()=>{
        it('should search for a user',(done)=>{
            chai.request(app)
            .patch(`/users/${testUserId}`)
            .send({
                name: "Updated User Name"
            })
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('object');
                done(); 
              });
        });
    });

    //test for deleting a user
    describe('DELETE /users/search/:name',()=>{
        it('should search for a user',(done)=>{
            chai.request(app)
            .delete(`/users/${testUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.include('deleted');
                done(); 
            });
        });
    });

});