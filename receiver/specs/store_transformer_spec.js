const {expect, sinon} = require('./spec_helper');

const StoreTransformer = require('../src/store_transformer');

describe("StoreTransformer", () => {

  let fakeGateway, fakeFilename, xform, content;

  beforeEach(() => {
    fakeGateway = {save_data: sinon.spy()};
    xform = new StoreTransformer(fakeGateway);
    fakeFilename = "test.json";
    content = { filename: fakeFilename };
  });

  it("should exist", () => {
    expect(StoreTransformer).to.exist;
  });

  it("should throw exception when no filename", () => {
    content.filename = null;
    expect(() => xform.transform(content)).to.throw();
  });

  it("should send data to the S3 gateway", () => {
    xform.transform(content);
    expect(fakeGateway.save_data).to.have.been.calledWith(fakeFilename, content);
  });

});