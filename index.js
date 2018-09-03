const PugTransformer = require('./src/pug_transformer');
const Agent = require('./src/agent');
const Receiver = require('./src/receiver');

let pug = new PugTransformer("doctype html\nhtml= data");
let debug = { transform: d => console.log(d) };
let agent = new Agent([pug, debug]);
let receiver = new Receiver([agent]);

receiver.receive({ data: "Hello, World!" });
