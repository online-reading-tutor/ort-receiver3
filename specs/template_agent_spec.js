const {expect, sinon} = require('./spec_helper');

let TemplateAgent = require('../src/template_agent');

describe("TemplateAgent", () => {

    it("should ask filler for content and return it", () => {
        let expectedOutput = "Blah!";
        let filler = { fill: _ => expectedOutput };
        let agent = new TemplateAgent(filler);
        let data = { data: "thingie" };

        let output = agent.process(data);

        expect(output).to.equal(expectedOutput);
    });

});