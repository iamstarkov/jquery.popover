$(function(){
	var msg = $('.js_popover');
	msg.popover({
		content: 'default'
	});

	$('input, textarea, select').on('change keyup click', function () {
		$(this).each(function(i, el) {
			var val = $(this).val();
			var name = $(this).prop('id');
			// console.log(name, val);
			msg.popover('option', name, val);
		});
	});

	$('[data-js-action]').on('click', function(e) {
		var action = $(this).data('js-action');
		msg.popover(action);

		e.preventDefault();
	});



});