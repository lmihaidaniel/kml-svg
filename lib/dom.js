/**
 * @module dom
 * Module for easing the manipulation of dom elements
 */

let classReg = function(c) {
	return new RegExp("(^|\\s+)" + c + "(\\s+|$)");
};

var _hasClass, _addClass, _removeClass, _toggleClass;

if ('classList' in document.documentElement) {
	_hasClass = function(elem, c) {
		return elem.classList.contains(c);
	};
	_addClass = function(elem, c) {
		if (c != null) {
			c = c.split(' ');
			for (var k in c) {
				if (c[k] != '') elem.classList.add(c[k]);
			}
		}
	};
	_removeClass = function(elem, c) {
		if (c != null) {
			c = c.split(' ');
			for (var k in c) {
				if (c[k] != '') elem.classList.remove(c[k]);
			}
		}
	};
} else {
	_hasClass = function(elem, c) {
		return classReg(c).test(elem.className);
	};
	_addClass = function(elem, c) {
		if (!hasClass(elem, c)) {
			elem.className = elem.className + ' ' + c;
		}
	};
	_removeClass = function(elem, c) {
		elem.className = elem.className.replace(classReg(c), ' ');
	};
}

_toggleClass = function(elem, c) {
	if (c != null) {
		var fn = _hasClass(elem, c) ? _removeClass : _addClass;
		fn(elem, c);
	}
};


export let hasClass = _hasClass;
export let addClass = _addClass;
export let toggleClass = _toggleClass;
export let removeClass = _removeClass;

/**
 * Determines, via duck typing, whether or not a value is a DOM element.
 *
 * @function isEl
 * @param    {Mixed} value
 * @return   {Boolean}
 */
export let isEl = function(value) {
	return !!value && typeof value === 'object' && value.nodeType === 1;
};

export default {};