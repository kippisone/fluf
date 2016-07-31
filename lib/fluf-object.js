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

module.exports = FlufObject;
