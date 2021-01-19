module.exports = class EmailGateway {
    create_email_content(details) {
        let htmlEntity = mimemessage.factory({
            contentType: 'text/html;charset=utf-8',
            body: details.content
        });

        let msg = mimemessage.factory({
            contentType: 'multipart/mixed',
            body: [htmlEntity]
        });
        msg.header('Subject', details.subject);
        return msg;
    }

    async send_email(details) {
        let msg = this.create_email_content(details);
        console.log(`Sending email from ${details.from} to ${details.to}`);
        await this.send_smtp(details, msg);
    }

    async send_smtp(details, msg) {
        throw "Subclass EmailGateway with your own implementation.";
    }
}
