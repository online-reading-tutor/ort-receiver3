const RuleEngine = require('./rule_engine');

class RuleTransformer {
    constructor() {
        this.engine = new RuleEngine();
    }

    register(rule) {
        this.engine.register(rule);
    }

    transform(input) {
        return this.engine.execute(input);
    }
}

module.exports = RuleTransformer;