const PugTemplateFiller = require('./src/pug_template_filler');
const TemplateAgent = require('./src/template_agent');
const Receiver = require('./src/receiver');

let filler = new PugTemplateFiller("doctype html\nhtml= data");
let agent = new TemplateAgent(filler);
let receiver = new Receiver([agent]);

receiver.receive({ data: "Hello, World!" });
