const app = require('./express.js');
const request = require('supertest');
const should = require('should');
const { doesNotThrow } = require('should');

describe('GET /users는', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
    })
    it('최대 limit 갯수만큼 응답한다', (done) => {
        request(app)
            .get('/users?limit=2')
            .end((err, res) => {
                res.body.should.have.lengthOf(2);
                done();
            })
    })
    describe('실패시', () => {
        it('limit 숫자형이 아니면 400을 응답한다.' , (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
})

describe('GET /users', ()=> {

});

describe('GET /users/1는', ()=> {
    describe('성공시', () => {
        it('id가 1인 유저인 객체를 반환한다.', (done) => {
            request(app)
                .get('/user/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })
    describe('실패시', () => {
        it('400 Response', (done) => {
            request(app)
                .get('/user/chanjong')
                .expect(400)
                .end(done)
        })
        it('404 Response', (done) => {
            request(app)
                .get('/user/999')
                .expect(404)
                .end(done)
        })
    })
})

describe('GET /user/1', () => {
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/user/1')
                .expect(204)
                .end(done)
        })
    })
    describe('실패시', () => {
        it('400을 응답한다', (done) => {
            request(app)
               .delete('/user/c')
               .expect(400)
               .end(done) 
        })
    })
})

describe('POST /users', () => {
    describe('성공시', () => {
        let name = 'daniel';
        let body;
        before((done)=> {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                })
        })
        it('생성된 유저 객체를 반환', () => {
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다', ()=>{
            body.should.have.property('name', name);
        })
    })
    describe('실패시', () => {
        it('name 파라매터 누락시 400 반환', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 409 반환', (done) => {
            request(app)
                .post('/users')
                .send({name: 'alice'})
                .expect(409)
                .end(done)
        })
    })
})