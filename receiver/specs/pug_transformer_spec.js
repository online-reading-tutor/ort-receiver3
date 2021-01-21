const {expect} = require('./spec_helper');

const PugTransformer = require('../src/pug_transformer');

describe("PugTransformer", () => {

    it("should transform a simple template", async () => {
        let pt = new PugTransformer("doctype html\nhtml= data");
        let input_data = {data: "Hello, World!"};
        let output = await pt.transform(input_data);
        let expected_html = "<!DOCTYPE html><html>Hello, World!</html>";
        expect(output).to.deep.equal({data: input_data, html: expected_html});
    });

});