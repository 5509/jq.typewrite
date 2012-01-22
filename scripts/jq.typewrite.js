/**
 * jq.typewrite
 *
 * @version      0.1
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         https://github.com/5509/jq.typewrite
 *
 * 2012-01-21 20:57
 */
;(function($, undefined) {

	var Typewrite = function(string_parent, conf) {
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
				duration: 1,
				hide: true
			}, conf);
			self.height = string_parent.css('height');
			self.$elem = string_parent;
			self.elem = string_parent[0];
			self.count = 0;
			self.current = [];
			self.loopFunc = [];
			self.playing = false;

			str = self.elem.innerHTML
				.replace(/(?:<br>)/g, '\\')
				.replace(/\t|\n|\r/g, '');
			str = new String(str);

			self.end = str.length - 1;
			self.perWait = (self.conf.duration || 1) * 1000 / str.length;
		
			if ( self.conf.hide ) {
				self._hide();
			}

			// add function to func list
			$.each(str, function(i, val) {
				self.loopFunc.push(self._func(i, val));
			});
		},

		_func: function(i, val) {
			var self = this;

			return function() {
				if ( val === '\\' ) {
					self.current.push('<br>');
				} else {
					self.current.push(val);
				}
				self.elem.innerHTML = self.current.join('');

				setTimeout(function() {
					if ( i === self.end ) {
						self.playing = false;
						self.dfd.resolve();
						self.current = [];
					} else {
						self.loopFunc[i + 1]();
					}
				}, self.perWait);
			}
		},

		_hide: function() {
			var self = this;

			self.$elem.css('height', self.height);
			self.elem.innerHTML = '';
		},

		play: function() {
			var self = this;

			if ( self.playing ) {
				return $.Deferred().reject();
			}
			self.dfd = $.Deferred();
			self.playing = true;
			self._hide();
			self.loopFunc[0]();

			return self.dfd.promise();
		}
	};

	$.typewrite = Typewrite;
	
}(jQuery));
