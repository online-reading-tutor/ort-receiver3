const {expect} = require('./spec_helper');

const RuleTransformer = require('../src/rule_transformer');

describe("RuleTransformer", () => {

    var transform, rule;

    let initialValue = "initial";
    let transformedValue = "transformed";

    beforeEach(() => {
        transform = new RuleTransformer();
        rule = {
            condition: function(r) {
                r.when(this && this.random === initialValue);
            },
            consequence: function(r) {
                this.random = transformedValue;
                r.next();
            }
        };
    });

    // it("should execute a simple rule", (done) => {
    //     transform.register(rule);
    //     let sampleData = {random: initialValue};
    //     let newData = transform.execute(sampleData);
    //     expect(newData.random).to.equal(data.random);
    // });

});