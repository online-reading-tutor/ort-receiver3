const fs = require('fs');

const AwsSesGateway = require('./src/aws_ses_gateway');
const EmailTransformer = require('./src/email_transformer');
const PugTransformer = require('./src/pug_transformer');
const RuleTransformer = require('./src/rule_transformer');
const ortRules = require('./src/ort_rules');
const Pipeline = require('./src/pipeline');
const Receiver = require('./src/receiver');

let rules = new RuleTransformer();
rules.register(ortRules);

let awsSesGateway = new AwsSesGateway();

let parentEmailSender = new EmailTransformer(awsSesGateway);
parentEmailSender.setSubject("Parent Subject Line");
parentEmailSender.setSender('stacey@vetzal.com');
parentEmailSender.addRecipient('stacey@vetzal.com');
let parentContentTransformer = new PugTransformer(fs.readFileSync('./templates/parent_email.pug', 'utf8'));
let parentPipeline = new Pipeline([rules, parentContentTransformer, parentEmailSender]);

let reportEmailSender = new EmailTransformer(awsSesGateway);
reportEmailSender.setSubject("Report Subject Line");
reportEmailSender.setSender('stacey@vetzal.com');
reportEmailSender.addRecipient('stacey@vetzal.com');
let reportEmailTransformer = new PugTransformer(fs.readFileSync('./templates/report_email.pug', 'utf8'));
let reportPipeline = new Pipeline([rules, reportEmailTransformer, reportEmailSender]);

let receiver = new Receiver([parentPipeline, reportPipeline]);

let data = JSON.parse(fs.readFileSync('./sample_data/sample.json'));
receiver.receive(data);
