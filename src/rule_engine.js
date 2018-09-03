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

    execute(workingMemory) {}

    ruleCount() {
        return this.rules.length;
    }
}

module.exports = RuleEngine;