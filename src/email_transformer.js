class EmailTransformer {

    constructor(emailGateway) {
        this.to = [];
        this.gateway = emailGateway;
    }

    transform(input) {
        if (input.data.email.recipients.length === 0) throw("No recipients");

        this.gateway.send_email({
            from: input.data.email.from,
            to: input.data.email.recipients,
            subject: input.data.email.subject,
            content: input.html
        });
    }
}

module.exports = EmailTransformer;