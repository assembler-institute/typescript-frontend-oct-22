import { makeRequest, Response } from './api-utils';

interface API {
  getPosts(): Promise<Response>;
}

function makeAPI(request: ReturnType<typeof makeRequest> = makeRequest()): API {
  function getPosts(): Promise<Response> {
    return request({
      url: '/api/post',
      requestMethod: 'GET',
    });
  }
  return {
    getPosts: getPosts,
  }
}

export default makeAPI();