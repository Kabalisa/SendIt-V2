import chai from 'chai';
import { createTestClient } from 'apollo-server-integration-testing';
import { apolloServer } from '../../app/index';
import { REGISTER_USER, DELETE_USER } from '../mutations/mutations';
import { GET_USERS } from '../queries/queries';

const { expect } = chai;
let Query: any;
let Mutate: any;

describe('resolver tests', () => {
    before(() => {
        const { query, mutate } = createTestClient({ apolloServer });
        Query = query;
        Mutate = mutate;
    });
    it('should register a user', async () => {
        const res = await Mutate(REGISTER_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('register');
        expect(res.data.register).to.be.a('object');
        expect(res.data.register).to.have.property('registrationType');
        expect(res.data.register).to.have.property('token');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});
describe('get users test', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    it('should fetch all users', async () => {
        const res = await Query(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.be.a('array');
        expect(res.data.getUsers[0]).to.have.property('id');
        expect(res.data.getUsers[0]).to.have.property('email');
    });
});

describe('delete user test', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    it('should delete a user', async () => {
        const res = await Mutate(DELETE_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('deleteUser');
        expect(res.data.deleteUser).to.be.a('object');
        expect(res.data.deleteUser).to.have.property('email');
    });
});
describe('registration error test', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    it('should fail to register a user', async () => {
        const res = await Mutate(REGISTER_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('register');
        expect(res.data.register).to.be.a('object');
        expect(res.data.register).to.have.property('errorType');
        expect(res.data.register).to.have.property('errorMessage');
    });
});

describe('delete user error test', () => {
    before(async () => {
        await Mutate(DELETE_USER);
    });
    it('should fail to delete a user', async () => {
        const res = await Mutate(DELETE_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('deleteUser');
        expect(res.data.deleteUser).to.be.a('object');
        expect(res.data.deleteUser).to.have.property('errorType');
        expect(res.data.deleteUser).to.have.property('errorMessage');
    });
});
