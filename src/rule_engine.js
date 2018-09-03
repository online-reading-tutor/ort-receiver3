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
            .reduce((wm, r) => {
                let wmCopy = Object.assign({}, wm);
                r.consequence(wmCopy)
                return wmCopy;
            }, workingMemory);
        return newMemory;
    }

    ruleCount() {
        return this.rules.length;
    }
}

module.exports = RuleEngine;