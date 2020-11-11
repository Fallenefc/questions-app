const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mocks = require('./mocks');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../dist/environment')

const { expect } = require('chai');


describe('Session Server:', function () {
  const testedServer = require('../dist/index.js');
  // const agent = request.agent(testedServer);
  const User = mongoose.connection.model('User');
  let token;

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection('users');
    } catch (error) {
      return true;
    }
  });

  after(async () => {
    testedServer.close();
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  describe('Invalid endpoints:', () =>{
    it('should return a status 404 when accessing an invalid endpoint', (done) => {
      request(testedServer)
        .get(mocks.mockURL)
        .expect(404)
        .end(done);
    });
  });

  describe('Resgistering New User (Endpoint "/signup"):', () => {
    it('should create a new user', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockUser1)
        .expect(201)
        .end(() => {
          User.find((err, users) => {
            expect(users.length).to.equal(1);
            done();
          });
        });
    });

    it('should store a bcrypt hashed password', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockUser1)
        .end(() => {
          User.find((err, users) => {
            expect(users[0].password).to.not.equal(mocks.mockUser1.password);
            expect(bcrypt.compareSync(mocks.mockUser1.password, users[0].password)).to.equal(true);
            done();
          });
        });
    });

    it('should return an error when creating a user without an email', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockIncompleteUser1)
        .expect((res)=> {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('should return an error when creating a user without a password', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockIncompleteUser2)
        .expect((res)=> {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('Should not create the same user twice', (done)=> {
      User.create(mocks.mockUser1).then(() => {
        request(testedServer)
          .post('/signup')
          .set('Content-Type', 'application/json')
          .send(mocks.mockUser1)
          .expect((res) => {
            expect(res.status).to.be.at.least(400);
          })
          .end(() => {
            User.find((err, users) => {
              expect(users.length).to.equal(1);
              done();
            });
          });
      });
    });
  });
  describe('Endpoint "/login":', () => {
    beforeEach(async () => {
      const hash = await bcrypt.hash(mocks.mockUser1.password, 10);
      await User.create({ ...mocks.mockUser1, password: hash});
    });

    it('should accept an email & password and return the user object', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
        .expect(200)
        .end(done);
    });

    it('should return an error when trying to login with the wrong credentials', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: mocks.mockUser2.password })
        .expect((res) => {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('should return an error when missing the email', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: '', password: mocks.mockUser1.password })
        .expect((res) => {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('should return an error when missing the password', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: '' })
        .expect((res) => {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('should return a valid access token on successful login', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
        .expect(200)
        .expect((res) => {
          token = res.body.accessToken;
        })
        .end(() => {
          User.find((err, users) => {
            const userId = String(users[0]._id);
            expect(jwt.verify(token, SECRET_KEY)._id).to.eql(userId);
            done();
          });
        });
    });
  });

  describe('Endpoint "/questions", GET requests', () => {
    beforeEach((done) => {
      User.create({ ...mocks.mockUser1, password: bcrypt.hashSync(mocks.mockUser1.password, 10)})
        .then(() => {
          request(testedServer)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
            .expect((res) => {
              token = res.body.accessToken;
            })
            .end(done);
        });
    });

    it('should deny entry to non-authorised users', (done) => {
      request(testedServer)
        .get('/questions')
        .expect((res) => {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('it should only allow access to authorized users', (done) => {
      request(testedServer)
        .get('/questions')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end(done);
    });
  });

  describe('Endpoint "/questions", POST requests', () => {
    beforeEach((done) => {
      User.create({ ...mocks.mockUser1, password: bcrypt.hashSync(mocks.mockUser1.password, 10)})
        .then(() => {
          request(testedServer)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
            .expect((res) => {
              token = res.body.accessToken;
            })
            .end(done);
        });
    });

    it('should deny entry to non-authorised users', (done) => {
      request(testedServer)
        .post('/questions')
        .expect((res) => {
          expect(res.status).to.be.at.least(400);
        })
        .end(done);
    });

    it('it should only allow access to authorized users', (done) => {
      request(testedServer)
        .post('/questions')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end(done);
    });
  });

  // describe('Endpoint "/exams":', () => {
  //   beforeEach((done) => {
  //     User.create({ ...mocks.mockUser1, password: bcrypt.hashSync(mocks.mockUser1.password, 10)})
  //       .then(() => {
  //         request(testedServer)
  //           .post('/login')
  //           .set('Content-Type', 'application/json')
  //           .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
  //           .expect((res) => {
  //             token = res.body.accessToken;
  //           })
  //           .end(done);
  //       });
  //   });

  //   it('should deny entry to non-authorised users', (done) => {
  //     request(testedServer)
  //       .get('/exam')
  //       .expect((res) => {
  //         expect(res.status).to.be.at.least(400);
  //       })
  //       .end(done);
  //   });

  //   it('it should only allow access to authorized users', (done) => {
  //     request(testedServer)
  //       .get('/exam')
  //       .set('Authorization', 'Bearer ' + token)
  //       .expect(200)
  //       .end(done);
  //   });
  // });
});
