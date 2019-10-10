/*!
 * name: next-ajax-hook
 * url: https://github.com/afeiship/next-ajax-hook
 * version: 1.0.0
 * date: 2019-10-10T08:10:56.612Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var REAL_XHR = '__RealXMLHttpRequest__';
  var DEFAULT_PROPXY = { properties: null, methods: null, events: null };

  var NxAjaxHook = nx.declare('nx.AjaxHook', {
    statics: {
      _proxy: null,
      on: function(inProxy) {
        var proxy = nx.mix(null, DEFAULT_PROPXY, inProxy || this._proxy);
        this.proxy = proxy;
        global[REAL_XHR] = global[REAL_XHR] || global.XMLHttpRequest;
        global.XMLHttpRequest = function() {
          var xhr = new global[REAL_XHR]();
          var properties = proxy.properties;
          var methods = proxy.methods;
          var events = proxy.events;
          var overrides = nx.mix(null, properties, methods);

          nx.forIn(overrides, function(key, value) {
            nx.defineProperty(xhr, key, value);
          });

          nx.forIn(events, function(key, value) {
            xhr.addEventListener(key, value);
          });

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

//# sourceMappingURL=next-ajax-hook.js.map
