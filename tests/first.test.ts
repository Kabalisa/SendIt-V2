import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;
const url = 'http://localhost:4000';

describe('first test', () => {
    it('first test', done => {
        chai.request(url)
            .post('/')
            .send({ query: '{ getAType (input: { leader:"fiston" }) { id leader genre }}' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('getAType');
                expect(res.body.data.getAType)
                    .to.have.property('id')
                    .equal('5e1c7c1a45274d3116e13387');
                expect(res.body.data.getAType)
                    .to.have.property('leader')
                    .equal('fiston');
                expect(res.body.data.getAType)
                    .to.have.property('genre')
                    .equal('ADVENTURE');
                done();
            });
    });
});
