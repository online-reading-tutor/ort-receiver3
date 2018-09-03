const RuleEngine = require('./rule_engine');

class RuleTransformer {
    constructor() {
        this.engine = new RuleEngine();
    }

    register(rule) {
        this.engine.register(rule);
    }

    transform(workingMemory) {
        return this.engine.execute(workingMemory);
    }
}

module.exports = RuleTransformer;