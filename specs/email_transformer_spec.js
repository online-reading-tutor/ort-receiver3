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

   it("should send recipients and content to the gateway", () => {
       let email = 'Someone Special <someone@domain.com>';
       xform.addRecipient(email);
       xform.transform(content);
       expect(fake_gateway.send_email).to.have.been.calledWith({ to: [email], content: content })
   });
});