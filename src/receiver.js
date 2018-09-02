class Receiver {
    constructor(agentList) {
        this.agents = agentList;
    }

    receive(data) {
        this.agents.forEach(a => a.process(data));
    }
}

module.exports = Receiver;