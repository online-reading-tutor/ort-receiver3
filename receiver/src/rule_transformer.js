const { MaximEngine } = require('maxim-engine');

class RuleTransformer {
    constructor() {
        this.engine = new MaximEngine();
    }

    register(rule) {
        this.engine.register(rule);
    }

    async transform(input) {
        return this.engine.execute(input);
    }
}

module.exports = RuleTransformer;