# jq.typewrite

This method gives a basic typewrite effect to a target element.  
Here is a [demo site](http://5509.me/sample/jq.typewrite/).

## Usage

### Basic

#### script

	var typewrite1 = $.typewrite($('#typewrite1'));
	$('#do_typewrite1').click(function() {
	  typewrite1.play();
	});

#### HTML

	<p id="typewrite1">This is typewrite</p>
	<p>
	  <input type="button" id="do_typewrite1" value="Do typewrite 1">
	</p>

### With options and using deferred

#### script

	var typewrite2 = $.typewrite($('#typewrite2'), {
		duration: 2,
		hide: false,
		end: '|'
	});
	$('#do_typewrite2').click(function() {
		typewrite2.play().done(function() {
			alert('completed');
		});
	});

#### HTML
	<p id="typewrite2">This is typewrite<br>
	This is typewrite</p>
	<p>
	  <input type="button" id="do_typewrite2" value="Do typewrite 2">
	</p>

## Options

* duration - duration time (def 1, 1 => 1s
* hide - default text showing option (def true
* end - typing cursor (def _(underscore
* wait - when target characters, adding wait time (def next

### wait (デフォルトは日本語全角のみ
* ！ - 0.1
* ？ - 0.1
* 、 - 0.1
* 。 - 0.1
