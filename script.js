$(window).load(function () {

	//api Приватбанку дає інфомацію по курсу гривні до різних валют на поточну дату
	let course = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=';

	//Функція, яка вибирає елементи з даним класом і після кожного елемента записує
	//новий параграф з новою ціною у валюті(після відповіді з сервера)
	function updatePrices(rate) {
		$('.auto-large-price, .auto-item-cena b:first-child').each(function (i, el) {
			let priceInZl = $(this).text();
			let strToNum = Number(priceInZl.replace(/\D+/g, ''));
			let priceInUsd = strToNum / rate;
			$(this).after('<p>' + '<strong>' + '<big>' + Math.round(priceInUsd) + '$');
		});
	}

	//Запит на api Приватбанку по конкретній валюті
	//Після відповіді з серверу викликається функція updatePrices яка за параметр
	//приймає курс валюти та виконує дії прописані у функції
	$.getJSON(course + 'pln&date&json', function (data) {
		let courseHrZl = data[0].rate;
		$.getJSON(course + 'usd&date&json', function (data) {
			let courseHrUsd = data[0].rate;
			let ZlToUsd = courseHrUsd / courseHrZl;
			updatePrices(ZlToUsd);
		});
	});
});