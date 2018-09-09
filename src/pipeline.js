class Pipeline {
    constructor(transformers) {
        this.transformers = transformers;
    }

    process(input) {
        return this.transformers.reduce((out, f) => f.transform(out), input);
    }
}

module.exports = Pipeline;