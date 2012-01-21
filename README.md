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

	&lt;p id="typewrite1">This is typewrite&lt;/p&gt;
	&lt;p&gt;
	  &lt;input type="button" id="do_typewrite1" value="Do typewrite 1"&gt;
	&lt;/p&gt;

### With options and using deferred

#### script

	var typewrite2 = $.typewrite($('#typewrite2'), {
		duration: 2,
		hide: false
	});
	$('#do_typewrite2').click(function() {
		typewrite2.play().done(function() {
			alert('completed');
		});
	});

#### HTML
	&lt;p id="typewrite2">This is typewrite&lt;br&gt;
	This is typewrite&lt;/p&gt;

## Options

* duration - duration time (def 1, 1 => 1s
* hide - default text showing option (def true
