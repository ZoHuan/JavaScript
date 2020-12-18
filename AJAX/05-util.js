var util = {
  get: function (url, query, callback, isJson) {
    if (query) {
      url += "?";
      for (let key in query) {
        url += `${key}=${query[key]}&`;
      }
      // 取出最后多余的&
      url = url.slice(0, -1);
    }
    let xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resp = isJson ? JSON.parse(xhr.response) : xhr.response;
          callback(resp);
        }
      }
    };
  },
  post: function (url, query, callback, isJson) {
    let obj = "";
    if (query) {
      obj = JSON.stringify(query);
    }
    let xhr = new XMLHttpRequest();
    xhr.open("post", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(obj);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resp = isJson ? JSON.parse(xhr.response) : xhr.response;
          callback(resp);
        }
      }
    };
  },
  // params: object:{method,url,query,callback,isJson}
  ajax: function (params) {
    let xhr = new XMLHttpRequest();
    if (params.method.toLowerCase() === "get") {
      if (params.query) {
        params.url += "?";
        for (key in params.query) {
          params.url += `${key}=${params.query[key]}&`;
        }
        params.url = params.url.slice(0, -1);
      }
      xhr.open(params.method, params.url);
      xhr.send();
    } else {
      let obj = "";
      if (params.query) {
        obj = JSON.stringify(params.query);
      }
      xhr.open(params.method, params.url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(obj);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resp = params.isJson ? JSON.parse(xhr.response) : xhr.response;
          params.callback(resp);
        }
      }
    };
  },
};
