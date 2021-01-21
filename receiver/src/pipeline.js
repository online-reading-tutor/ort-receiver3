class Pipeline {
    constructor(transformers) {
        this.transformers = transformers;
    }

    async process(input) {
        let result = input;
        for (let f of this.transformers) {
            result = await f.transform(result);
        }
        return result;
    }
}

module.exports = Pipeline;