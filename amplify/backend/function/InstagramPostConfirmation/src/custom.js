/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log('Hey Lambda function is triggered');
  console.log('🚀 ~ event', event);
  return event;
};
