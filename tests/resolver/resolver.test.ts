import chai from 'chai';
import { createTestClient } from 'apollo-server-integration-testing';
import mockedEnv from 'mocked-env';
import { apolloServer } from '../../app/index';
import {
    REGISTER_USER,
    DELETE_USER,
    LOGIN_USER,
    VALIDATE_USER,
    REGISTER_USER_2,
    DELETE_USER_2,
    VALIDATE_USER_2,
} from '../mutations/mutations';
import { GET_USERS } from '../queries/queries';

const { expect } = chai;
let Query: any;
let Mutate: any;
let SetOptions: any;
let TOKEN: string;

//tests
describe('resolver tests', () => {
    before(() => {
        const { query, mutate, setOptions } = createTestClient({ apolloServer });
        Query = query;
        Mutate = mutate;
        SetOptions = setOptions;
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
});
describe('login user test', () => {
    before(async () => {
        await Mutate(VALIDATE_USER);
    });
    it('should login a user', async () => {
        const res = await Mutate(LOGIN_USER, { variables: { Email: 'ikabalisa20@gmail.com', Password: 'password' } });
        TOKEN = res.data.logIn.token;
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('logIn');
        expect(res.data.logIn).to.be.a('object');
        expect(res.data.logIn).to.have.property('registrationType');
        expect(res.data.logIn).to.have.property('token');
    });
    after(async () => {
        SetOptions({
            request: {
                headers: {
                    authorization: TOKEN,
                },
            },
        });
        await Mutate(DELETE_USER);
    });
});
describe('get users test', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    beforeEach(async () => {
        await Mutate(VALIDATE_USER);
    });
    it('should fetch all users', async () => {
        const res = await Query(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.have.property('results');
        expect(res.data.getUsers.results).to.be.an('array');
        expect(res.data.getUsers.results[0]).to.have.property('id');
        expect(res.data.getUsers.results[0]).to.have.property('email');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});
describe('delete user test', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    beforeEach(async () => {
        await Mutate(VALIDATE_USER);
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
    beforeEach(async () => {
        await Mutate(VALIDATE_USER);
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
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('registration error. email not sent', () => {
    let restore: any;
    before(async () => {
        restore = mockedEnv({
            SENDGRID_API_KEY: 'TESTAPIKEY',
        });
    });
    it('email not sent', async () => {
        const res = await Mutate(REGISTER_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('register');
        expect(res.data.register).to.be.a('object');
        expect(res.data.register).to.have.property('errorType');
        expect(res.data.register).to.have.property('errorMessage');
    });
    afterEach(() => {
        restore();
    });
    after(async () => {
        await Mutate(REGISTER_USER);
    });
});

describe('delete user error test', () => {
    before(async () => {
        await Mutate(VALIDATE_USER);
    });
    it('should fail to delete a user', async () => {
        const res = await Mutate(DELETE_USER_2);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('deleteUser');
        expect(res.data.deleteUser).to.be.a('object');
        expect(res.data.deleteUser).to.have.property('errorType');
        expect(res.data.deleteUser).to.have.property('errorMessage');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('fail to login user test 1', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    it('user should not exist', async () => {
        const res = await Mutate(LOGIN_USER, { variables: { Email: 'ikabalisa@gmail.com', Password: 'password' } });
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('logIn');
        expect(res.data.logIn).to.be.a('object');
        expect(res.data.logIn).to.have.property('errorType');
        expect(res.data.logIn).to.have.property('errorMessage');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('fail to login user test 2', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    beforeEach(async () => {
        await Mutate(VALIDATE_USER);
    });
    it('incorrect password', async () => {
        const res = await Mutate(LOGIN_USER, { variables: { Email: 'ikabalisa20@gmail.com', Password: 'pasord' } });
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('logIn');
        expect(res.data.logIn).to.be.a('object');
        expect(res.data.logIn).to.have.property('errorType');
        expect(res.data.logIn).to.have.property('errorMessage');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('fail to login user test 3', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    it('validate your email first', async () => {
        const res = await Mutate(LOGIN_USER, { variables: { Email: 'ikabalisa20@gmail.com', Password: 'password' } });
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('logIn');
        expect(res.data.logIn).to.be.a('object');
        expect(res.data.logIn).to.have.property('errorType');
        expect(res.data.logIn).to.have.property('errorMessage');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('fail to validate the user twice', () => {
    before(async () => {
        await Mutate(REGISTER_USER);
    });
    beforeEach(async () => {
        await Mutate(VALIDATE_USER);
    });
    it('should fail to validate the user twice', async () => {
        const res = await Mutate(VALIDATE_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('validateUser');
        expect(res.data.validateUser).to.be.a('object');
        expect(res.data.validateUser).to.have.property('message');
    });
    after(async () => {
        await Mutate(DELETE_USER);
    });
});

describe('fail to validate the user who do not exist', () => {
    it('should not validata no-existing users', async () => {
        const res = await Mutate(VALIDATE_USER);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('validateUser');
        expect(res.data.validateUser).to.be.a('object');
        expect(res.data.validateUser).to.have.property('message');
    });
});

describe('fail to test get users 1', () => {
    let token: string;
    before(async () => {
        const res = await Mutate(REGISTER_USER);
        token = res.data.register.token;
    });
    it('validate your email', async () => {
        SetOptions({
            request: {
                headers: {
                    authorization: token,
                },
            },
        });
        const res = await Query(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.have.property('errorType');
        expect(res.data.getUsers).to.have.property('errorMessage');
    });
    after(async () => {
        SetOptions({
            request: {
                headers: {
                    authorization: TOKEN,
                },
            },
        });
        await Mutate(VALIDATE_USER);
    });
});

describe('fail to test get users 3', () => {
    let token: any;
    before(async () => {
        const res = await Mutate(REGISTER_USER_2);
        token = res.data.register.token;
    });
    beforeEach(async () => {
        await Mutate(VALIDATE_USER_2);
    });
    it('user is no the admin', async () => {
        SetOptions({
            request: {
                headers: {
                    authorization: token,
                },
            },
        });
        const res = await Query(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.have.property('errorType');
        expect(res.data.getUsers).to.have.property('errorMessage');
    });
    after(async () => {
        SetOptions({
            request: {
                headers: {
                    authorization: TOKEN,
                },
            },
        });
        await Mutate(DELETE_USER_2);
    });
});

describe('fail to test get users 2', () => {
    before(async () => {
        await Mutate(DELETE_USER);
    });
    it('user should not exist', async () => {
        const res = await Query(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.have.property('errorType');
        expect(res.data.getUsers).to.have.property('errorMessage');
    });
});

describe('no token provided test', () => {
    before(() => {
        SetOptions({
            request: {
                headers: {
                    authorization: null,
                },
            },
        });
    });
    it('should test no token provided', async () => {
        const res = await Mutate(GET_USERS);
        expect(res).to.be.a('object');
        expect(res).to.have.property('data');
        expect(res.data).to.have.property('getUsers');
        expect(res.data.getUsers).to.have.property('errorType');
        expect(res.data.getUsers).to.have.property('errorMessage');
    });
});
