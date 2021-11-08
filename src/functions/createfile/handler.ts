import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { write } from '../../common/s3bucket';
import * as multipart from 'aws-lambda-multipart-parser';


const create: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  if (event.isBase64Encoded) {
    event.body = event.body.toString('ascii')
  } else {

    try {
      if (!event.pathParameters) {
        throw new Error('no data in event')
      }
      const parse = await multipart.parse(event)
      const filename = event.pathParameters.filename
      const bucket = "bilals3bucket"


      const newdata = await write(filename, bucket, parse)
      if (!newdata) {
        throw new Error("failed to add data")
      }
      return formatJSONResponse({
        newdata
      });
    } catch (e) {
      return formatJSONResponse({
        e
      });
    }
  }


}

export const main = middyfy(create);
