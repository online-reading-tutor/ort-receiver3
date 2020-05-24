class Receiver {
    constructor(agentList) {
        this.agents = agentList;
    }

    async receive(input) {
        for (let a of this.agents) {
            await a.process(input);
        }
    }
}

module.exports = Receiver;