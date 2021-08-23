window.htconfig = {
  Default: {
    convertURL: function (url) {
      var storagePrefix = '';
      if (storagePrefix && url && !/^data:image/.test(url) && !/^http/.test(url) && !/^https/.test(url)) {
        url = storagePrefix + '/' + url;
      }
      return url;
    },
  },
};
