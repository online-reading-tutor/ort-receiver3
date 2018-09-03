const fs = require('fs');

const PugTransformer = require('./src/pug_transformer');
const RuleTransformer = require('./src/rule_transformer');
const ortRules = require('./src/ort_rules');
const Agent = require('./src/agent');
const Receiver = require('./src/receiver');

let rules = new RuleTransformer();
rules.register(ortRules);

let parentEmailTransformer = new PugTransformer(fs.readFileSync('./templates/parent_email.pug', 'utf8'));
let parentDebug = { transform: d => fs.writeFile('parent.html', d, err => err && console.log(err)) };
let parentAgent = new Agent([rules, parentEmailTransformer, parentDebug]);

let reportEmailTransformer = new PugTransformer(fs.readFileSync('./templates/report_email.pug', 'utf8'));
let reportDebug = { transform: d => fs.writeFile('report.html', d, err => err && console.log(err)) };
let reportAgent = new Agent([rules, reportEmailTransformer, reportDebug]);

let receiver = new Receiver([parentAgent, reportAgent]);

let data = JSON.parse(fs.readFileSync('./sample_data/sample.json'));
receiver.receive(data);
