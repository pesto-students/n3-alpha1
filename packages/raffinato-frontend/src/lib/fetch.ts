type Params = Record<string, string>;

const DEFAULT_HEADER = {
  Authorization: `Bearer ${localStorage.getItem('@token')}`,
};

const { REACT_APP_API_URL } = process.env;

const getCompleteURL = (url: string) => `${REACT_APP_API_URL}/${url}`;

export const objToQueryStr = (obj: Params) =>
  Object.keys(obj)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');

const responseIsJSON = (res: Response) => {
  const contentType = res.headers.get('content-type');

  if (!contentType) {
    return false;
  }

  return contentType.includes('application/json');
};

const get = async (
  url: string,
  params: Params = {},
  headers = DEFAULT_HEADER,
  settings = {}
) => {
  const res = await fetch(`${getCompleteURL(url)}?${objToQueryStr(params)}`, {
    ...settings,
    headers,
  });

  if (!responseIsJSON(res)) {
    throw Error(
      JSON.stringify({
        status: null,
        statusText: 'Response is not JSON',
      })
    );
  }

  return res.json();
};

const post = async (
  url: string,
  body: Response['body'],
  headers = DEFAULT_HEADER,
  settings = {}
) => {
  const res = await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    }),
    ...settings,
  });

  if (!responseIsJSON(res)) {
    return { status: res.status };
  }

  return res.json();
};

export { get, post };
