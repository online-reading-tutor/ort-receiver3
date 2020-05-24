const pug = require('pug');

class PugTransformer {
    constructor(template) {
        this.process = pug.compile(template);
    }

    async transform(input) {
        let html = this.process(input);
        return {
            data: input,
            html: html
        };
    }
}

module.exports = PugTransformer;