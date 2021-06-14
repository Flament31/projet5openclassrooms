new Promise(function (resolve, reject) {
});

function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };   
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};