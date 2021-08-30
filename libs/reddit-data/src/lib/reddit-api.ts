import axios from 'axios';

//source: https://github.com/feross/reddit/blob/master/index.js

const TOKEN_BASE_URL = 'https://www.reddit.com/api/v1/access_token';
const API_BASE_URL = 'https://oauth.reddit.com';
const REQUEST_TIMEOUT = 30 * 1000;

const CLIENT_SIDE_API_BASE_URL = '/api/reddit';

type IRedditAPIParameters = {
  appId: string;
  appSecret: string;
  username: string;
  password: string;
  userAgent: string;
};

const toBase64 = (string: string) => {
  return string;
};

const getAccessToken = async ({
  username,
  password,
  appId,
  userAgent,
  appSecret,
}: IRedditAPIParameters) => {
  const authorizationHeader = `Basic ${toBase64(`${appId}:${appSecret}`)}`;

  const response = await axios({
    method: 'POST',
    url: TOKEN_BASE_URL,
    data: {
      grant_type: 'password',
      username: username,
      password: password,
    },
    headers: {
      authorization: authorizationHeader,
      'user-agent': userAgent,
      'content-type': 'application/json',
    },
    timeout: REQUEST_TIMEOUT,
  });

  const {
    access_token: accessToken,
    expires_in: accessTokenExpiresIn,
    token_type: accessTokenType,
  } = response.data;

  return {
    accessTokenType,
    accessTokenExpiresIn,
    accessToken,
  };
};

const createGetAccessToken = (params: IRedditAPIParameters) => {
  const state = {
    accessToken: null,
    accessTokenExpiresIn: 0,
  };

  return async () => {
    if (Date.now() / 1000 <= state.accessTokenExpiresIn) {
      return state.accessToken;
    }

    return getAccessToken(params);
  };
};

const createClientSideRedditAPI = () => {
  const client = axios.create({
    baseURL: CLIENT_SIDE_API_BASE_URL,
  });

  return client;
};

const createSeverSideRedditAPI = (params: IRedditAPIParameters) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
  });

  const getAccessToken = createGetAccessToken(params);

  client.interceptors.request.use(async (requestConfig) => {
    const accessToken = await getAccessToken();

    requestConfig.headers.authorization = accessToken;
    requestConfig.headers.userAgent = params.userAgent;
    requestConfig.timeout = REQUEST_TIMEOUT;

    return requestConfig;
  });

  return client;
};

const getRedditAPIParameters = (): IRedditAPIParameters => {
  return {
    username: '',
    password: '',
    appId: '',
    appSecret: '',
    userAgent: '',
  };
};

export const createRedditAPI = () => {
  if (typeof window === 'undefined') {
    const parameters = getRedditAPIParameters();

    return createSeverSideRedditAPI(parameters);
  }

  return createClientSideRedditAPI();
};
