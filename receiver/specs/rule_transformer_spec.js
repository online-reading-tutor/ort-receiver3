const util = require('util');
const {expect} = require('./spec_helper');

const RuleTransformer = require('../src/rule_transformer');

describe("RuleTransformer", () => {

    var ruleTransformer, rule;

    let initialValue = "initial";
    let transformedValue = "transformed";

    beforeEach(() => {
        ruleTransformer = new RuleTransformer();
        rule = {
            condition: wm => wm.random === initialValue,
            consequence: wm => wm.random = transformedValue
        };
    });

    it("should execute a simple rule", async () => {
        ruleTransformer.register(rule);
        let sampleData = {random: initialValue};
        let newData = await ruleTransformer.transform(sampleData);
        expect(newData.random).to.equal(transformedValue);
    });

});