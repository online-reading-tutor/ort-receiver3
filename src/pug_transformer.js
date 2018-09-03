const pug = require('pug');

class PugTransformer {
    constructor(template) {
        this.process = pug.compile(template);
    }

    transform(data) {
        return this.process(data);
    }
}

module.exports = PugTransformer;