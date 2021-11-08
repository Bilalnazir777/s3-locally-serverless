import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import create from '@functions/createfile';

const serverlessConfiguration: AWS = {
  service: 's3-serverless',
  frameworkVersion: '2',
  custom: {
    s3bucket: {
      stages: ["dev"],
      start: {
        port: 4569
      }
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-s3-local'],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "*",
        resource: "*"
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },

  resources: {
    Resources: {
      NewResource: {
        Type: "AWS::S3::Bucket",
        Properties: {
          bucketname: 'bilals3bucket'
        }
      }
    }
  },



  // import the function via paths
  functions: { hello, create },
};

module.exports = serverlessConfiguration;
