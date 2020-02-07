import chai from 'chai';
import { AuthHelper } from '../../app/helpers/authHelper';
import { send } from '../../app/utilities/mailSender';

const { expect } = chai;
const noEmailInfo = { email: '' };
const noSubjectInfo = { email: 'email@example.com', subject: '' };
const noHtmlInfo = { email: 'email@example.com', subject: 'subject here', html: '' };

describe('mailSender with no email', () => {
    it('should try to send an email without receiver email', () => {
        send(AuthHelper, noEmailInfo)
            .then()
            .catch(error => {
                expect(error.message).to.equal('Provide email');
            });
    });
});
describe('mailSender with no subject', () => {
    it('should try to send an email without a subject', () => {
        send(AuthHelper, noSubjectInfo)
            .then()
            .catch(error => {
                expect(error.message).to.equal('Provide subject');
            });
    });
});
describe('mailSender with no html', () => {
    it('should try to send an email without an html', () => {
        send(AuthHelper, noHtmlInfo)
            .then()
            .catch(error => {
                expect(error.message).to.equal('No html provided');
            });
    });
});
