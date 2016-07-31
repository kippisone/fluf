'use strict';

let inspect = require('inspect.js');
let Obj = require('../fluf').Obj;

describe('fluf.Obj', function() {
  describe('get()', function() {
    it('Gets an object item', function() {
      let obj = new Obj({
        foo: 'bar'
      });

      inspect(obj.get('foo')).isEql('bar');
    });
  });
});
