(function() {
  var nx = require('next-js-core2');
  var NxAjaxHook = require('../src/next-ajax-hook');

  describe('NxAjaxHook.methods', function() {
    test('init', function() {
      NxAjaxHook.on({
        events: {},
        methods: {},
        properties: {
          loadstart: function() {
            console.log('load start!');
          }
        }
      });
      // console.log(rs1, rs2);

      // expect(rs1).toBe(true);
    });
  });
})();
