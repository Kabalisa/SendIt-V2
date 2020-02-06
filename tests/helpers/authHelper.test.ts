import chai from 'chai';
import { AuthHelper } from '../../app/helpers/authHelper';
import { UserModel } from '../../app/models/mongoModels';

const { expect } = chai;

describe('fetchAUser method test', () => {
    it('should return null', async () => {
        const input = { email: null };
        const results = await AuthHelper.fetchAUser(UserModel, input);
        expect(results).to.equal(null);
    });
});
