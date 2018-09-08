class EmailTransformer {

    constructor(emailGateway) {
        this.to = [];
        this.gateway = emailGateway;
    }

    addRecipient(email) {
        this.to.push(email);
    }

    transform(data) {
        if (this.to.length == 0) throw("No recipients");

        this.gateway.send_email({
            to: this.to,
            content: data
        });
    }
}

module.exports = EmailTransformer;