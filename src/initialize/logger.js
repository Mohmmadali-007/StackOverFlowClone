const maxResponseSize = 4294967296; // 2^32 for long text

exports.saveLog = async (request, data) => {
  try {
    // service name
    // eg: request.originalUrl = 'localhost:8000/api/user-management/client/add'
    let [baseUrl, api] = request.originalUrl.split('/api/');
    let serviceName, apiRoute;
    if (api) {
      api = api.split('/');
      serviceName = api[0];
      api.shift();
      apiRoute = api.join('/');
    }

    // requestBody
    let requestBody;
    if (request.method === 'GET') {
      requestBody = JSON.stringify(request.query);
    } else {
      requestBody = JSON.stringify(request.body);
    }

    // calculate API execution time
    const executionTimeInMS = data.afterTime - data.beforeTime;

    // response_data
    let responseData = JSON.stringify(data.response);
    if (Buffer.byteLength(responseData) > maxResponseSize) {
      responseData = responseData.slice(0, maxResponseSize - 1);
    }

    // saving to database
    await DATABASE.Log.create({
      service_name: serviceName,
      api_route: apiRoute,
      request_body: requestBody,
      response_status_code: data.statusCode,
      response_data: responseData,
      execution_time_in_ms: executionTimeInMS,
    });
  } catch (error) {
    console.log(error);
  }
};
