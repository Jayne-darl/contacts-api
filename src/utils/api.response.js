// Response object is not globally available so, the need to get if from each request handler

export const requestResponse = ({
  response,
  statusCode = 500,
  message = 'Internal Server Error. Please try again',
  data,
}) => response.status(statusCode).json({
  message,
  ...(data && { data }),
});
