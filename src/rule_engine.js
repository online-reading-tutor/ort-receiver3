class RuleEngine {
    constructor() {
        this.rules = [];
    }

    register(param) {
        if (!Array.isArray(param)) return this.registerSingleRule(param);
        param.forEach(r => this.registerSingleRule(r));
    }

    registerSingleRule(rule) {
        if (this.rules.includes(rule)) throw("Rule already registered");
        this.rules.push(rule);
    }

    execute(workingMemory) {
        let newMemory = this.rules
            .filter(r => r.condition(workingMemory))
            .reduce(this.runConsequence, workingMemory);
        return newMemory;
    }

    runConsequence(workingMemory, rule) {
        let workingMemoryCopy = Object.assign({}, workingMemory);
        rule.consequence(workingMemoryCopy)
        return workingMemoryCopy;
    }

    ruleCount() {
        return this.rules.length;
    }
}

module.exports = RuleEngine;