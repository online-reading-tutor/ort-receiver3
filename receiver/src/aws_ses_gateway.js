const util = require('util');
const AWS = require('aws-sdk');
const mimemessage = require('mimemessage');

class AwsSesGateway {

    constructor(config = {region: "us-east-1"}) {
        AWS.config.update(config)
    }

    send_email(details) {

        let htmlEntity = mimemessage.factory({
            contentType: 'text/html;charset=utf-8',
            body: details.content
        });

        let msg = mimemessage.factory({
            contentType: 'multipart/mixed',
            body: [htmlEntity]
        });
        msg.header('Subject', details.subject);

        new AWS.SES().sendRawEmail({
            Source: details.from,
            Destinations: details.to,
            RawMessage: { Data: msg.toString() }
        }).promise()
            .then(data => console.log(util.inspect(data)))
            .catch(err => console.trace(err));
    }
}

module.exports = AwsSesGateway;