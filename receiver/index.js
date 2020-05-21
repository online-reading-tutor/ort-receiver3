const fs = require('fs');
const AwsSesGateway = require('./src/aws_ses_gateway');
const EmailTransformer = require('./src/email_transformer');
const PugTransformer = require('./src/pug_transformer');
const RuleTransformer = require('./src/rule_transformer');
const Pipeline = require('./src/pipeline');
const Receiver = require('./src/receiver');

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
                    // from: 'Online Reading Tutor <app@onlinereadingtutor.com>',
                    from: 'Online Reading Tutor <stacey@vetzal.com>',
                    recipients: [
                        // `${wm.contact.contactName} <${wm.contact.email}>`,
                        `${wm.contact.contactName} co Stacey Vetzal <stacey@vetzal.com>`
                    ]
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
                    // from: 'Online Reading Tutor <app@onlinereadingtutor.com>',
                    from: 'Online Reading Tutor <stacey@vetzal.com>',
                    recipients: [
                        // `${wm.contact.contactName} <${wm.contact.email}>`,
                        `ORT co Stacey Vetzal <stacey@vetzal.com>`
                    ]
                };
            }
        }
    );
    let reportEmailSender = new EmailTransformer(awsSesGateway);
    let reportEmailTransformer = new PugTransformer(fs.readFileSync('./templates/report_email.pug', 'utf8'));
    let reportPipeline = new Pipeline([adminRules, reportEmailTransformer, reportEmailSender]);
    return reportPipeline;
}

const ortRules = require('./src/ort_rules');

exports.handler = async (event) => {

    let awsSesGateway = new AwsSesGateway();
    let parentPipeline = createParentPipeline(awsSesGateway, ortRules);
    let reportPipeline = createReportPipeline(awsSesGateway, ortRules);
    let receiver = new Receiver([parentPipeline, reportPipeline]);

    receiver.receive(event.body);

    return {
        statusCode: 200,
        body: "OK"
    }

};