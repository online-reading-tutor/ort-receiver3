const util = require('util');
const AWS = require('aws-sdk');

class AwsS3Gateway {

  constructor(bucket, config = {region: "us-east-1"}) {
    this.bucket = bucket;
    AWS.config.update(config);
  }

  async save_data(filename, data) {

    let s3 = new AWS.S3();

    await s3.putObject({
      Body: JSON.stringify(data),
      Key: filename,
      Bucket: this.bucket
    }).promise()
      .then(data => console.log(util.inspect(data)))
      .catch(err => console.trace(err));
  }
}

module.exports = AwsS3Gateway;