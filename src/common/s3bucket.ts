import * as AWS from 'aws-sdk';
// import AWS from 'aws-sdk';


const s3client = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER', // This specific key is required when working offline
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:4569'),
})



export const write = async (filename, bucket, parse) => {


    const params = {
        Key: filename,
        Bucket: bucket,
        Body: Buffer.from(parse.pic.content, 'ascii')
        // Body: parse
    }

    const newdata = await s3client.putObject(params).promise()
    return newdata
}