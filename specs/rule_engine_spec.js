const { expect } = require('./spec_helper');

const RuleEngine = require('../src/rule_engine');

describe("RuleEngine", () => {

    var engine;

    beforeEach(() => {
        engine = new RuleEngine();
    });

    it("should register a single rule", () => {
        let rule = {};
        engine.register(rule);
        expect(engine.ruleCount()).to.equal(1);
    });

    it("should register multiple rules", () => {
        let rule1 = { condition: (wm) => true };
        let rule2 = { condition: (wm) => true };
        engine.register([rule1, rule2]);
        expect(engine.ruleCount()).to.equal(2);
    });

    it("should not allow registering the same rule twice", () => {
       let rule = {};
       expect(() => {
           engine.register([rule, rule]);
       }).to.throw();
    });

});