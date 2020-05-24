class StoreTransformer {
  constructor(awsS3Gateway) {
    this.awsS3Gateway = awsS3Gateway;
  }

  transform(input) {
    if (!input.filename) throw("No filename");

    this.awsS3Gateway.save_data(input.filename, input);
  }
}

module.exports = StoreTransformer;