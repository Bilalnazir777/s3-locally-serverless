
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'putobject/{filename}',

      }
    }
  ],
  s3hook: {
    handler: "handlerPath.s3hook",
    events: [
      {
        s3: "bilals3bucket",
        event: "s3:*"

      }
    ]
  },
}
