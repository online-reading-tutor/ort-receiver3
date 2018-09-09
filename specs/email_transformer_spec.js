const { expect, sinon } = require('./spec_helper');

const EmailTransformer = require('../src/email_transformer');

describe("EmailTransformer", () => {

    let fake_gateway, xform, content;

    beforeEach(() => {
        fake_gateway = { send_email: sinon.spy() };
        xform = new EmailTransformer(fake_gateway);
        content = "Some kind of body";
    });

    it("should throw exception when no recipients", () => {
        expect(() => xform.transform(content)).to.throw();
    });

   it("should send sender, recipients and content to the gateway", () => {
       let recipient = 'Someone Special <someone@domain.com>';
       let sender = "someone@somewhere.com";
       let subject = "Simple Subject";
       xform.setSender(sender);
       xform.setSubject(subject);
       xform.addRecipient(recipient);
       xform.transform(content);
       expect(fake_gateway.send_email).to.have.been.calledWith({ from: sender, to: [recipient], subject: subject, content: content })
   });
});