import {EmailGateway} from "./email_gateway";
import {SMTPClient} from 'smtp-client';

export class MailjetGateway extends EmailGateway {

    constructor(config) {
        super();
        this.config = config;
    }

    async send_smtp(details, msg) {
        let s = new SMTPClient({
            host: this.config.host,
            port: this.config.port
        });

        try {
            await s.connect();
            await s.greet({hostname: 'mail.onlinereadingtutor.com'});
            await s.authPlain({
                username: this.config.username,
                password: this.config.password
            });
            await s.mail({from: details.from});
            await s.rcpt({to: details.to});
            await s.data(msg.toString());
            await s.quit();
        } catch(err) {
            console.trace(err);
        }
    }
}
