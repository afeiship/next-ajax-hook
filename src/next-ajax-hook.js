(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var REAL_XHR = '__RealXMLHttpRequest__';
  var DEFAULT_PROPXY = { properties: null, methods: null, events: null };

  var NxAjaxHook = nx.declare('nx.AjaxHook', {
    statics: {
      __proxy: null,
      __hookProperties: function(inXhr) {
        var properties = this.proxy.properties;
        nx.forIn(properties, function(key, value) {
          nx.defineProperty(inXhr, key, value);
        });
      },
      __hookMethods: function(inXhr) {
        var methods = this.proxy.methods;
        nx.forIn(methods, function(key, value) {
          var old = inXhr[key].bind(inXhr);
          inXhr[key] = function() {
            var args = nx.slice(arguments);
            if (value.call(inXhr, args, old) !== null) {
              old.apply(inXhr, args);
            }
          };
        });
      },
      __hookEvents: function(inXhr) {
        var events = this.proxy.events;
        nx.forIn(events, function(key, value) {
          inXhr.addEventListener(key, value);
        });
      },
      on: function(inProxy) {
        var self = this;
        this.proxy = nx.mix(null, DEFAULT_PROPXY, inProxy || this.__proxy);
        global[REAL_XHR] = global[REAL_XHR] || global.XMLHttpRequest;

        global.XMLHttpRequest = function() {
          var xhr = new global[REAL_XHR]();
          self.__hookProperties(xhr);
          self.__hookMethods(xhr);
          self.__hookEvents(xhr);
          return xhr;
        };
      },
      off: function() {
        global[REAL_XHR] && (global.XMLHttpRequest = global[REAL_XHR]);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAjaxHook;
  }
})();
