'use strict';

(function() {

	const $apodContainer = $('#apodContainer');
	const $apodImg = $apodContainer.find('#apod_img');
	const $apodTitle = $apodContainer.find('#apod_title');
	const $apodDescription = $apodContainer.find('#apod_description');
	const $apodImgContainer = $apodContainer.find('#apod_img_container');
	const $apodHdUrl = $apodContainer.find('#apod_hdUrl');

	const $marsShotsContainer = $('#marsShotsContainer');
	const $marsShotsDataContainer = $marsShotsContainer.find('#marsDataContainer');
	const marsShotsTemplate = $marsShotsContainer.find('#marsShotsTemplate').html();

	const api_key = '8yzExYRva45rtHeOn68lF04YoYxzXaAdUsu51FvN';

	function render(obj) {
		$marsShotsDataContainer.append(Mustache.render(marsShotsTemplate, obj));
	}

	function apodLookup() {
		$.ajax({
			type: 'GET',
			url: 'https://api.nasa.gov/planetary/apod?api_key=' + api_key,
			success: function(data) {
				if (data) {
					$apodImg.attr('src', data.url);
					$apodImg.attr('alt', data.title);
					$apodTitle.html(data.title);
					$apodHdUrl.attr('href', data.hdurl);
					$apodDescription.html(data.explanation)
				}
			},
			error: function(err) {
				$apodImgContainer.html(err.responseText);
			}
		});
	}

	function marsShots() {		
		$.ajax({
			type: 'GET',
			url: 'http://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=200&api_key=' + api_key,
			success: function(data) {
				if (data) {
					$.each(data.photos, function(i, result) {
						let image = new Image();
						image.src = result.img_src;
						image.onload = function() {
							if (this.width > 800) {
								render(result);
							}
						}
					});
				}
			}
		});
	}

	apodLookup();
	marsShots();
}());