const {expect, sinon} = require('./spec_helper');

const Pipeline = require('../src/pipeline');
const PugTransformer = require('../src/pug_transformer');
const RuleTransformer = require('../src/rule_transformer');

describe("Pipeline", () => {

    it("should just return the last transformer's output", () => {
        let xform1 = {transform: d => "b"};
        let xform2 = {transform: d => "c"};
        let agent = new Pipeline([xform1, xform2]);

        let output = agent.process("a");

        expect(output).to.equal("c");
    });

    it("should pass data between transformers", () => {
        let addition_transformer = {transform: a => a + 1};
        let agent = new Pipeline([addition_transformer, addition_transformer]);
        let data = 1;

        let output = agent.process(data);

        expect(output).to.equal(3);
    });

    describe("Pipeline, RuleTransformer, PugTransformer", () => {

        let initialValue = "initial";
        let transformedValue = "transformed";

        it("should integrate a rule transformer and a pug transformer", () => {
            let ruleTransformer = new RuleTransformer();
            ruleTransformer.register({
                condition: wm => wm.message === initialValue,
                consequence: wm => wm.message = transformedValue
            });

            let pugTransformer = new PugTransformer("doctype html\nhtml= message");

            let agent = new Pipeline([ruleTransformer, pugTransformer]);

            let output = agent.process({message: initialValue});

            let expected_html = `<!DOCTYPE html><html>${transformedValue}</html>`;
            expect(output).to.deep.equal({data: { message: transformedValue }, html: expected_html})
        });
    });

});