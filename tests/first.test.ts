import chai from 'chai';
import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { server } from '../app/index';

// chai.use(chaiHttp);

const { expect } = chai;

describe('first test', () => {
    it('first test', async () => {
        const GET_A_TYPE = gql`
            query {
                getAType(input: { leader: "fiston" }) {
                    id
                    leader
                    genre
                }
            }
        `;
        const { query } = createTestClient(server);
        const res = await query({ query: GET_A_TYPE });
        expect(res.data).to.be.a('object');
    });
});
