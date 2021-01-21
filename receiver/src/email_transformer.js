class EmailTransformer {

    constructor(emailGateway) {
        this.to = [];
        this.gateway = emailGateway;
    }

    async transform(input) {
        if (input.data.email.to.length === 0) throw("No recipients");

        await this.gateway.send_email({
            from: input.data.email.from,
            to: input.data.email.to,
            cc: input.data.email.cc,
            bcc: input.data.email.bcc,
            subject: input.data.email.subject,
            content: input.html
        });
    }
}

module.exports = EmailTransformer;