const { MaximEngine } = require('maxim-engine');

class RuleTransformer {
    constructor() {
        this.engine = new MaximEngine();
    }

    register(rule) {
        this.engine.register(rule);
    }

    transform(input) {
        return this.engine.execute(input);
    }
}

module.exports = RuleTransformer;