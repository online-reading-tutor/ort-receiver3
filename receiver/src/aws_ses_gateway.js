import {EmailGateway} from "./email_gateway";

const util = require('util');
const AWS = require('aws-sdk');

class AwsSesGateway extends EmailGateway {

    constructor(config = {region: "us-east-1"}) {
        super();
        AWS.config.update(config)
    }

    async send_smtp(details, msg) {
        await new AWS.SES().sendRawEmail({
            Source: details.from,
            Destinations: details.to,
            RawMessage: {Data: msg.toString()}
        }).promise()
            .then(data => console.log(util.inspect(data)))
            .catch(err => console.trace(err));
    }
}

module.exports = AwsSesGateway;