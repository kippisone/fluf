'use strict';

var FlufUtils = require('./fluf-utils');

var FlufObject = function(obj) {
  this.__obj = obj;
}

FlufObject.prototype.get = function (key) {
	var obj = this.__obj;

	if (!key) {
		return obj;
	}

	var keys = key.split('.');
	for (var i = 0, len = keys.length; i < len; i++) {
		if (!obj.hasOwnProperty(keys[i])) {
			return undefined;
		}

		obj = obj[keys[i]];
	}

	return obj;
};

/**
 * Walks recursive through a tree and calls `fn` on each property
 * @param  {Function} fn Function to be called on each property
 * @chainable
 * @return {object}      Returns this value
 */
FlufObject.prototype.walk = function(fn) {
  let walkArray = function(item, ctx) {
    item.forEach(function(item, index) {
      let type = FlufUtils.getType(item);
      let ctx = {
        type: type,
        isArrayContent: true
      };

      if (type === 'object') {
        fn.call(ctx, item, index);
        walk(item);
        return;
      }

      if (type === 'array') {
        fn.call(ctx, item, index);
        walkArray(item);
        return;
      }

      fn.call(ctx, item, index);
    });
  };

	let walk = function flufObjectWalk(tree) {
		for (let key in tree) {
      let ctx = {
        type: FlufUtils.getType(tree[key])
      };

      if (tree.hasOwnProperty(key)) {
        if (ctx.type === 'string') {
          fn.call(ctx, tree[key], key);
          continue;
        }

        if (Array.isArray(tree[key])) {
          fn.call(ctx, tree[key], key);
          walkArray(tree[key], ctx);
          continue;
        }

        if (typeof tree[key] === 'object' && tree[key] !== null) {
          fn.call(ctx, tree[key], key);
          walk(tree[key]);
          continue;
        }
      }
    }
  };

  walk(this.__obj);

	return this;
};

module.exports = FlufObject;
