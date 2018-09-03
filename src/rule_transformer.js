const RuleEngine = require('./rule_engine');

class RuleTransformer {
    constructor() {
        this.engine = new RuleEngine();
    }

    register(rule) {
        this.engine.register(rule);
    }

    execute(workingMemory, callback) {
        this.engine.execute(workingMemory, callback);
    }
}

module.exports = RuleTransformer;