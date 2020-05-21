class Receiver {
    constructor(agentList) {
        this.agents = agentList;
    }

    receive(input) {
        this.agents.forEach(a => a.process(input));
    }
}

module.exports = Receiver;