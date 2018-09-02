const {expect, sinon} = require('./spec_helper');

let Receiver = require('../src/receiver');

describe("Receiver", () => {

    it("should receive a data bundle and send it to all agents", () => {
        let agent1 = {receive: sinon.spy()};
        let agent2 = {receive: sinon.spy()};
        let receiver = new Receiver([agent1, agent2]);
        let data = {data: "bundle"};

        receiver.receive(data);

        expect(agent1.receive).to.have.been.calledWith(data);
        expect(agent2.receive).to.have.been.calledWith(data);
    });

});