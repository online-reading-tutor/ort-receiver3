class EmailTransformer {

    constructor(emailGateway) {
        this.to = [];
        this.gateway = emailGateway;
    }

    addRecipient(email) {
        this.to.push(email);
    }

    setSender(email) {
        this.sender = email;
    }

    setSubject(content) {
        this.subject = content;
    }

    transform(data) {
        if (this.to.length === 0) throw("No recipients");

        this.gateway.send_email({
            from: this.sender,
            to: this.to,
            subject: this.subject,
            content: data
        });
    }
}

module.exports = EmailTransformer;