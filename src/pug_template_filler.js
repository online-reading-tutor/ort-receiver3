const pug = require('pug');

class PugTemplateFiller {
    constructor(template) {
        this.process = pug.compile(template);
    }

    fill(data) {
        return this.process(data);
    }
}

module.exports = PugTemplateFiller;