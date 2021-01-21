const {expect, sinon} = require('./spec_helper');

let Receiver = require('../src/receiver');

describe("Receiver", () => {

    it("should receive a data bundle and send it to all agents", async () => {
        let agent1 = {process: sinon.spy()};
        let agent2 = {process: sinon.spy()};
        let receiver = new Receiver([agent1, agent2]);
        let data = {data: "bundle"};

        await receiver.receive(data);

        expect(agent1.process).to.have.been.calledWith(data);
        expect(agent2.process).to.have.been.calledWith(data);
    });

});