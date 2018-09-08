const fs = require('fs');

const PugTransformer = require('./src/pug_transformer');
const RuleTransformer = require('./src/rule_transformer');
const ortRules = require('./src/ort_rules');
const Pipeline = require('./src/pipeline');
const Receiver = require('./src/receiver');

let rules = new RuleTransformer();
rules.register(ortRules);

let parentEmailTransformer = new PugTransformer(fs.readFileSync('./templates/parent_email.pug', 'utf8'));
let parentDebug = { transform: d => fs.writeFile('parent.html', d, err => err && console.log(err)) };
let parentPipeline = new Pipeline([rules, parentEmailTransformer, parentDebug]);

let reportEmailTransformer = new PugTransformer(fs.readFileSync('./templates/report_email.pug', 'utf8'));
let reportDebug = { transform: d => fs.writeFile('report.html', d, err => err && console.log(err)) };
let reportPipeline = new Pipeline([rules, reportEmailTransformer, reportDebug]);

let receiver = new Receiver([parentPipeline, reportPipeline]);

let data = JSON.parse(fs.readFileSync('./sample_data/sample.json'));
receiver.receive(data);
