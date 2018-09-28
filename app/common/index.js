export const changeUrl = url => url.replace("http(s)", "https");

export const options = {
  headers: {
    "content-type": "application/json"
  }
};

export const api = {
  host: "http://rap2api.taobao.org/app/mock/85415/",
  creation: "api/creation",
  up: "api/up"
};
