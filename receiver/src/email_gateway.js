const mimemessage = require('mimemessage')

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

        for (let to of details.to)
            msg.header('TO', to);

        if ("bcc" in details && details.bcc)
            for (let bcc of details.bcc)
                msg.header('BCC', bcc);

        if ("cc" in details && details.cc)
            for (let cc of details.cc)
                msg.header('CC', cc);

        return msg;
    }

    async send_email(details) {
        let msg = this.create_email_content(details);
        console.log(`Sending email from ${details.from} to ${details.to} cc ${details.cc} bcc ${details.bcc}\n\n${msg.toString()}\n`);
        await this.send_smtp(details, msg);
    }

    async send_smtp(details, msg) {
        throw "Subclass EmailGateway with your own implementation.";
    }
}
