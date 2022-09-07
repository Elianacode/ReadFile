'use strict'
const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const s3 = new AWS.S3()

const awsClient = new AWS.DynamoDB.DocumentClient()

const ddbTable = process.env.DDBtable 

// The Lambda handler
exports.handler = async (event) => {

  await Promise.all(
    event.Records.map(async (registry) => {
      try {
        console.log('Get registry: ', registry)

        // Get original text from object in incoming event
        const originalText = await s3.getObject({
          Bucket: event.Records[0].s3.bucket.name,
          Key: event.Records[0].s3.object.key
        }).promise()

        // Upload JSON to DynamoDB
        const jsonData = JSON.parse(originalText.Body.toString('utf-8'))
        //await ddbSave(info)
        await deleteFileFromBucket(event.Records[0].s3.bucket.name, event.Records[0].s3.object.key)
      } catch (err) {
        console.error(err)
      }
    })
  )
}

// Validate Hash and Load JSON data to DynamoDB table
const ddbSave = async (info) => {
  //pending for implement
  //Create hash for compare
  const strngHash = null


}

const deleteFileFromBucket = async (name, key) => {
  await s3.deleteObject({
      Bucket: name,
      Key: key
  }).promise()
}
