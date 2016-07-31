var Obj = function(obj) {
  this.__obj = obj;
}

Obj.prototype.get = function (key) {
	var obj = this.__obj;

	if (!key) {
		return obj;
	}

	var keys = key.split('.');
	for (var i = 0, len = keys.length; i < len; i++) {
		if (!obj.hasOwnProperty(k)) {
			return undefined;
		}

		obj = obj[k];
	}
};

module.exports.Obj = Obj
