// const AwsSesGateway = require("./src/mailjet_gateway");
const AwsSesGateway = require("./src/aws_ses_gateway");

const fs = require('fs');
const AwsS3Gateway = require('./src/aws_s3_gateway');
const EmailTransformer = require('./src/email_transformer');
const StoreTransformer = require('./src/store_transformer');
const PugTransformer = require('./src/pug_transformer');
const RuleTransformer = require('./src/rule_transformer');
const Pipeline = require('./src/pipeline');
const Receiver = require('./src/receiver');

const ORT_EMAIL=`Online Reading Tutor <app@onlinereadingtutor.com>`;
const STACEY_EMAIL=`Stacey Vetzal <stacey@vetzal.com>`;
const BCC_STACEY_EMAIL=`Blind co Stacey Vetzal <svetzal@gmail.com>`;

function createParentPipeline(awsSesGateway, ortRules) {
    let parentEmailSender = new EmailTransformer(awsSesGateway);
    let parentRules = new RuleTransformer();
    parentRules.register(ortRules);
    parentRules.register(
        {
            condition: wm => 'contact' in wm && 'studentName' in wm.contact,
            consequence: wm => {
                wm.email = {
                    subject: `Online Reading Tutor Assessment for ${wm.contact.studentName}`,
                    from: ORT_EMAIL,
                    to: [
                        `${wm.contact.contactName} <${wm.contact.email}>`,
                    ],
                    bcc: [ BCC_STACEY_EMAIL ],
                    cc: [ STACEY_EMAIL ],
                };
            }
        }
    );
    let parentContentTransformer = new PugTransformer(fs.readFileSync('./templates/parent_email.pug', 'utf8'));
    let parentPipeline = new Pipeline([parentRules, parentContentTransformer, parentEmailSender]);
    return parentPipeline;
}

function createReportPipeline(awsSesGateway, ortRules) {
    let adminRules = new RuleTransformer();
    adminRules.register(ortRules);
    adminRules.register(
        {
            condition: wm => 'contact' in wm && 'studentName' in wm.contact,
            consequence: wm => {
                wm.email = {
                    subject: `Online Reading Tutor Assessment for ${wm.contact.studentName}`,
                    from: ORT_EMAIL,
                    to: [
                        STACEY_EMAIL,
                        // ORT_EMAIL,
                    ],
                    bcc: [ BCC_STACEY_EMAIL ],
                    cc: [ STACEY_EMAIL ],
                };
            }
        }
    );
    let reportEmailSender = new EmailTransformer(awsSesGateway);
    let reportEmailTransformer = new PugTransformer(fs.readFileSync('./templates/report_email.pug', 'utf8'));
    let reportPipeline = new Pipeline([adminRules, reportEmailTransformer, reportEmailSender]);
    return reportPipeline;
}

function createStorePipeline(awsS3Gateway) {
    let filenameCreation = new RuleTransformer();
    filenameCreation.register(
        {
            condition: wm => 'contact' in wm && 'studentName' in wm.contact,
            consequence: wm => {
                let prefix = new Date().toJSON().replace(/:/g, '-').replace(/^(.+)T(.+)\.\d+\w+$/, "$1-$2");
                let suffix = wm.contact.studentName.toLowerCase().replace(/\W/g, '');
                wm.filename = `${prefix}-${suffix}.json`;
            }
        }
    )
    let storeToS3 = new StoreTransformer(awsS3Gateway);
    let storePipeline = new Pipeline([filenameCreation, storeToS3]);
    return storePipeline;
}

const ortRules = require('./src/ort_rules');

exports.handler = async (event) => {

    console.log("Starting receiver lambda");

    // let awsSesGateway = new MailjetGateway({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     username: process.env.SMTP_USERNAME,
    //     password: process.env.SMTP_PASSWORD,
    // });
    let awsSesGateway = new AwsSesGateway();
    let parentPipeline = createParentPipeline(awsSesGateway, ortRules);
    let reportPipeline = createReportPipeline(awsSesGateway, ortRules);
    let storePipeline = createStorePipeline(new AwsS3Gateway(process.env.BUCKET_NAME));
    let receiver = new Receiver([storePipeline, parentPipeline, reportPipeline]);

    let data = JSON.parse(event.body);

    await receiver.receive(data);

    console.log("Completing receiver lambda");

    return {
        statusCode: 200,
        body: "OK"
    }
};