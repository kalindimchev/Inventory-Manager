var templates = (function () {
  var templates = {};

  function get(url, cb) {
    var promise = new Promise(function (resolve, reject) {
      if (templates[url]) {
        resolve(templates[url]);
        return;
      }
      if (typeof cb === 'function') {
        cb();
      }
      $.ajax({
        url: url,
        success: function (html) {
          resolve(html);
          templates[url] = html;

        },
        error: function (err) {
          reject(err);
        }
      });
    });

    return promise;
  }

  return {
    get: get
  };
} ());