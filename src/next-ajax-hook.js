(function () {

  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  var NxAjaxHook = nx.declare('nx.AjaxHook', {

  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAjaxHook;
  }

}());
