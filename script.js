$(window).load(function() {
	let course = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=';

	function updatePrices(rate) {
		$('.auto-large-price, .auto-item-cena b:first-child').each(function(i, el) {
			let priceInZl = $(this).text();
			let strToNum = Number(priceInZl.replace(/\D+/g, ''));
			let priceInUsd = strToNum / rate;
			$(this).after('<p>' + '<strong>' + '<big>' + Math.round(priceInUsd) + '$');
		});
	}

	$.getJSON(course + 'pln&date&json', function(data) {
		let courseHrZl = data[0].rate;
		$.getJSON(course + 'usd&date&json', function(data) {
			let courseHrUsd = data[0].rate;
			let ZlToUsd = courseHrUsd / courseHrZl;
			updatePrices(ZlToUsd);
		});
	});
});
