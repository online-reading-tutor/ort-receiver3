class TemplateAgent {
    constructor(transformers) {
        this.transformers = transformers;
    }

    process(data) {
        return this.transformers.reduce((out, f) => f.transform(out), data);
    }
}

module.exports = TemplateAgent;