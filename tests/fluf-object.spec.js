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

  describe('walk()', function() {
    it('Walks recursive through an object', function() {
      let obj = new Obj({
        foo: 'bar',
        bla: {
          blub: 'blub 1',
          blob: 'blob 2'
        },
        arr: ['one', 'two'],
        arr2: [{ num: 'one'}, {num: 'two'}],
        arr3: [['one', 'two'], ['three']]
      });

      let res = [];
      obj.walk((value, key) => {
        res.push(key + ':' + value);
      });

      inspect(res).isEql([
        'foo:bar',
        'bla:[object Object]',
        'blub:blub 1',
        'blob:blob 2',
        'arr:one,two',
        '0:one',
        '1:two',
        'arr2:[object Object],[object Object]',
        '0:[object Object]',
        'num:one',
        '1:[object Object]',
        'num:two',
        'arr3:one,two,three',
        '0:one,two',
        '0:one',
        '1:two',
        '1:three',
        '0:three'
      ]);
    });
  });
});
