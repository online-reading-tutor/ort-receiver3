const { expect } = require('./spec_helper');

const PugTransformer = require('../src/pug_transformer');

describe("PugTransformer", () => {

    it("should transform a simple template", () => {
        let pt = new PugTransformer("doctype html\nhtml= data");
        let output = pt.transform({data: "Hello, World!"});
        expect(output).to.equal("<!DOCTYPE html><html>Hello, World!</html>");
    });

});