class Receiver {
    constructor(agentList) {
        this.agents = agentList;
    }

    receive(data) {
        this.agents.forEach(a => a.receive(data));
    }
}

module.exports = Receiver;