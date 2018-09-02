class TemplateAgent {
    constructor(filler) {
        this.filler = filler;
    }

    process(data) {
        return this.filler.fill(data);
    }
}

module.exports = TemplateAgent;