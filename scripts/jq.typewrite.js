/**
 * jq.typewrite
 *
 * @version      0.4
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         https://github.com/5509/jq.typewrite
 *
 * 2012-01-24 02:19
 */
;(function($, undefined) {

	var Typewrite = function(string_parent, conf) {
		this.namespace = 'Typewrite';
		if ( this instanceof Typewrite ) {
			return this.init(string_parent, conf);
		}
		return new Typewrite(string_parent, conf);
	};
	Typewrite.prototype = {
		init: function(string_parent, conf) {
			var self = this,
				end = undefined,
				l = undefined,
				str = undefined;

			self.dfd = undefined;
			self.conf = $.extend({
				esc: '\\',
				duration: 1,
				end: '_',
				hide: true,
				wait: {
					'！': 0.1,
					'？': 0.1,
					'。': 0.1,
					'、': 0.1
				}
			}, conf);
			self.height = string_parent.css('height');
			self.$elem = string_parent;
			self.elem = string_parent[0];
			self.count = 0;
			self.current = [];
			self.loopFunc = [];
			self.playing = false;

			self.str = self.elem.innerHTML
				.replace(/(?:<br>)/g, self.conf.esc)
				.replace(/\t|\n|\r/g, '');
			self.str = self.str.split('');

			self.end = self.str.length - 1;
			self._setDuration(self.conf.duration);
		
			if ( self.conf.hide ) {
				self._hide();
			}

			// add function to func list
			$.each(self.str, function(i, val) {
				self.loopFunc.push(self._func(i, val));
			});
		},

		_setDuration: function(duration) {
			var self = this;
			self.perWait = duration * 1000 / self.str.length;
		},

		_func: function(i, val) {
			var self = this;

			return function() {
				var wait = self.perWait,
					strings = undefined,
					c = undefined;

				// when target character, perWait is a little longer
				for ( c in self.conf.wait ) {
					if ( val !== c ) continue;
					wait = wait + self.conf.wait[c] * 1000;
				}

				if ( val === self.conf.esc ) {
					self.current.push('<br>');
				} else {
					self.current.push(val);
				}

				strings = self.current.join('');

				if ( i !== self.end ) {
					strings = strings + self.conf.end;
				}
					
				self.elem.innerHTML = strings;

				setTimeout(function() {
					if ( i === self.end ) {
						self.playing = false;
						self.dfd.resolve();
						self.current = [];
					} else {
						self.loopFunc[i + 1]();
					}
				}, wait);
			}
		},

		_hide: function() {
			var self = this;

			self.$elem.css('height', self.height);
			self.elem.innerHTML = '';
		},

		play: function(duration) {
			var self = this;

			if ( self.playing ) {
				return $.Deferred().reject();
			}
			if ( duration ) {
				self._setDuration(duration);
			}
			self.dfd = $.Deferred();
			self.playing = true;
			self._hide();
			self.loopFunc[0]();

			return self.dfd.promise();
		}
	};

	function extend_method(base, obj) {
		var c = undefined,
			namespace = toFirstLetterLowerCase(obj.namespace),
			method_name = undefined;
		for ( c in obj ) {
			if ( typeof obj[c] !== 'function'
			  || /(?:^_)|(?:^handleEvent$)|(?:^init$)/.test(c) ) {
				continue;
			}
			method_name = namespace + toFirstLetterUpperCase(c);
			base[method_name] = (function() {
				var p = c;
				return function(arguments) {
					return obj[p](arguments);
				}
			}());
		}
		return base;
	}

	function toFirstLetterUpperCase(string) {
		return string.replace(
			/(^[a-z])/,
			function($1) {
				return $1.toUpperCase();
			}
		);
	}

	function toFirstLetterLowerCase(string) {
		return string.replace(
			/(^[A-Z])/,
			function($1) {
				return $1.toLowerCase();
			}
		);
	}

	// method extend
	$.typewrite = Typewrite;
	// $.fn extend
	$.fn.typewrite = function(conf) {
		var type = Typewrite(this, conf);

		base = extend_method(this, type);
		return this;
	};
	
}(jQuery));
