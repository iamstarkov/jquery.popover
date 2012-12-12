
/**
 * jQuery.popover
 *
 * popover / notification
 *
 */

/* Use:

Prototyping
var $input = $('input');

$.fn.popover({
	position: 'right',
	autoOpen: false,
	content: 'title'
})

'basic.operation'
$('some_btn').on('click', function(event) {

	$input.popover('show');
	// $input.popover('hide');
	// $input.popover('toggle');

	event.preventDefault();
});

$('some_input').on('blur', function(event) {
	validation = validate($this.val());

	if (!validation.valid) {
		$(this).popover({
			position: 'right',
			content: validation.error,
			notify: true
		})
	}
});
 */

;(function ( $, window, document, undefined ) {

var methods = {
	init: function( custom_options ) {

		var options = $.extend( {}, $.fn.popover.options, custom_options );

		return this.each(function() {

			var elem = $(this);

			// If the plugin hasn't been initialized yet
			if (!elem.data('popover')) {


				var init_o = $.extend( {}, options, elem.data('popover') );
				var msg = elem.popover('get_message', options.content);
				
				if ($.isFunction(init_o.beforeCreate)) { init_o.beforeCreate(msg); }
				
				msg.appendTo('body');


				elem.data('popover', {
					target: elem,
					options: init_o,
					popover: msg
				});

				msg.hide();
			}

			var data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;

			elem.on('click.popover', function (e) {
				popover.toggle(o.effect, o.speed);
				$(this).toggleClass('active');

				e.preventDefault();
			});

			elem.popover('refresh');

			if (o.autoOpen) {
				elem.popover('show');
			}

			if (o.notify) {
				var delay = o.delay+o.speed*2;
				setTimeout(function() {
					elem.popover('hide');
				}, delay);
			}

			if ($.isFunction(o.afterCreate)) { o.afterCreate(popover); }

		});
	},

	destroy: function( ) {

		return this.each(function() {

			var elem    = $(this),
				data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;


			// Namespacing FTW
			$(window).unbind('.popover');
			elem.removeData('popover');
			popover.remove();

		});

	},

	refresh: function() {
		return this.each(function() {

			var elem    = $(this),
				data    = elem.data('popover'),
				// target  = data.target,
				o       = data.options,
				popover = data.popover;

			popover.prop('class', 'popover');
			var type = _.contains(o.types, o.type) ?
				o.type
				: $.fn.popover.options.type;
			if (type) { popover.addClass('popover--' + type); }

			var position = _.contains(o.positions, o.position) ?
				o.position
				: $.fn.popover.options.position;
			if (position) { popover.addClass('popover--' + position); }


			if ($.isFunction(o.beforeRefresh)) { o.beforeRefresh(popover); }
			popover
				.find('.popover__content')
				.html(o.content);

			elem.popover('reposition');

			if ($.isFunction(o.afterRefresh)) { o.afterRefresh(popover); }
		});
	},

	get_message: function(content) {
		return $('<div />')
			.addClass('popover')
			.html(
				'<div class="popover__triangle_wrap">'+
					'<div class="popover__triangle"></div>'+
				'</div>'+
				'<div class="popover__content">'+
					content+
				'</div>'
			);
	},

	option: function () {
		var option = arguments[0];
		if (_.size(arguments) === 2) {
			var value = arguments[1];
			return this.each(function() {
				var elem    = $(this),
					data    = elem.data('popover'),
					target  = data.target,
					o       = data.options,
					popover = data.popover;

				elem.data('popover').options[option] = value;
				console.log(option, elem.data('popover').options[option]);
					
				elem.popover('refresh');
				return this;
			});
		} else if (_.size(arguments) === 1) {
			return this.each(function() {
				var elem    = $(this),
					data    = elem.data('popover'),
					target  = data.target,
					o       = data.options,
					popover = data.popover;
					
				return elem.options[arguments[0]];
			});
		}


	},

	reposition: function() {
		return this.each(function() {

			var elem    = $(this),
				data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;

			var invertPositions = ['bottom', 'left', 'top', 'right'],
				index = _.indexOf(o.positions, o.position),
				invertPosition = invertPositions[index];

			var sep = (o.position === 'top' || o.position === 'left')?'-' : '+';

			if ($.isFunction(o.beforeReposition)) { o.beforeReposition(popover); }
			popover.position({
				'my': invertPosition,
				'at': o.position + sep + o.margin,
				'of': elem
			});
			if ($.isFunction(o.afterReposition)) { o.afterReposition(popover); }
		});

	},
	toggle: function() {
		return this.each(function() {
			var elem    = $(this),
				data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;


			if ($.isFunction(o.beforeToggle)) { o.beforeToggle(popover); }
			popover.toggle(o.effect, o.speed);

			if (popover.is(':visible')) {
				$(document).mouseup(function (event) {

					if (popover.has(event.target).length === 0) {
						elem.popover('hide');
					}

					event.preventDefault();
				});
			}

			if ($.isFunction(o.afterToggle)) { o.afterToggle(popover); }

		});
	},
	show: function() {
		return this.each(function() {


			var elem    = $(this),
				data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;

			if ($.isFunction(o.beforeShow)) { o.beforeShow(popover); }
			// console.log(o.effect, o.speed);
			popover.show(o.effect, o.speed);
			if ($.isFunction(o.afterShow)) { o.afterShow(popover); }

			$(document).mouseup(function (event) {

				if (popover.has(event.target).length === 0) {
					elem.popover('hide');
				}

				event.preventDefault();
			});

		});
	},
	hide: function() {
		return this.each(function() {
			var elem    = $(this),
				data    = elem.data('popover'),
				target  = data.target,
				o       = data.options,
				popover = data.popover;

			if ($.isFunction(o.beforeHide)) { o.beforeHide(popover); }
			// console.log(o.speed);
			// console.log(o.effect, o.speed);
			popover.hide(o.effect, o.speed);
			// popover.hide(o.effect, o.speed);
			if ($.isFunction(o.afterHide)) { o.afterHide(popover); }

		});
	}
};

$.fn.popover = function ( method ) {

	if (methods[method]) {
		// console.log('$.fn..popover.' +	method + ' ');
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === 'object' || !method) {
		return methods.init.apply(this, arguments);
	} else {
		$.error('Method ' +	method + ' does not exist on jQuery.popover');
	}

};


$.fn.popover.options = {
	autoOpen: false,
	notify: false,
	delay: 4000,
	effect: 'fade',
	speed: 'fast',
	margin: 4,
	content: null,
	types: ['important', 'warning', 'error', 'success'],
	position: 'bottom',
	positions: ['top', 'right', 'bottom', 'left'],

	// callbacks
	beforeCreate: null,
	afterCreate: null,
	beforeToggle: null,
	afterToggle: null,
	beforeShow: null,
	afterShow: null,
	beforeHide: null,
	afterHide: null,
	beforeReposition: null,
	afterReposition: null,

	beforeRefresh: null,
	afterRefresh: null
};

})( jQuery, window, document );


// underscore
(function() {
	var root = this;
	var previousUnderscore = root._;
	var breaker = {};
	var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	var push = ArrayProto.push,
		slice = ArrayProto.slice,
		concat = ArrayProto.concat,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty;

	var
		nativeForEach = ArrayProto.forEach,
		nativeMap = ArrayProto.map,
		nativeReduce = ArrayProto.reduce,
		nativeReduceRight = ArrayProto.reduceRight,
		nativeFilter = ArrayProto.filter,
		nativeEvery = ArrayProto.every,
		nativeSome = ArrayProto.some,
		nativeIndexOf = ArrayProto.indexOf,
		nativeLastIndexOf = ArrayProto.lastIndexOf,
		nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind;

	var _ = function(obj) {
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		This._wrapped = obj;
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
		exports._ = _;
	} else {
		root._ = _;
	}

	_.keys = nativeKeys || function(obj) {
		if (obj !== Object(obj)) throw new TypeError('Invalid object');
		var keys = [];
		for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
		return keys;
	};

	_.contains = _.include = function(obj, target) {
		if (obj == null) return false;
		if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
		return any(obj, function(value) {
			return value === target;
		});
	};

	_.indexOf = function(array, item, isSorted) {
		if (array == null) return -1;
		var i = 0, l = array.length;
		if (isSorted) {
			if (typeof isSorted == 'number') {
				i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
			} else {
				i = _.sortedIndex(array, item);
				return array[i] === item ? i : -1;
			}
		}
		if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
		for (; i < l; i++) if (array[i] === item) return i;
		return -1;
	};

	_.size = function(obj) {
		if (obj == null) return 0;
		return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
	};
}).call(this);