// Subscriptions Powered by ReCharge Payments: JavaScript
		(function() {
			// Basic function to load script files, will be used to include jQuery
			var loadScript = function(url, callback) {
				var script = document.createElement("script");
				script.type = "text/javascript";
				// If the browser is Internet Explorer
				if (script.readyState){
					script.onreadystatechange = function() {
						if (script.readyState == "loaded" || script.readyState == "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				// For any other browser
				} else {
					script.onload = function() {
						callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);
			};
			// This is our JavaScript that we'll run after jQuery is included
			var reChargeThemeFooterJS = function($) {
				function reChargeSaveCartNoteAndRedirectToCart() {
					var has_cart_note_or_attribute = false;
					try {
						var data = {};
						if ($('[name="note"]').val() != undefined) {
							var note = $('[name="note"]').val();
							data['note'] = note;
							has_cart_note_or_attribute = true;
						}
						if (has_cart_note_or_attribute) {
							$.ajax({
								type: 'POST',
								data: data,
								url: '/cart/update.js',
								dataType: 'json',
								success: function() {
									window.location.href = '/cart';
								}
							});
						} else {
							window.location.href = '/cart';
						}
					} catch (e) {
						window.location.href = '/cart';
					}
				}
				var checkout_button_selectors = '[href="/checkout"], form[action="/cart"] button[type="submit"], form[action="/cart"] input[type="submit"], form[action="/checkout"] input[type="submit"], form[action="/checkout"] button[type="submit"]';
				$(document).on('click', checkout_button_selectors, function(e) {
					if (!e.target.hasAttribute('data-disable-recharge')) {
						e.preventDefault();
						reChargeSaveCartNoteAndRedirectToCart();
						window.location.href = '/cart';
					} else {
						console.info('ReCharge disabled');
					}
				});
			}
			// Check if jQuery is added, if not, then we'll loadScript, otherwise, run reChargeJS
			if ((typeof(jQuery) == 'undefined') || (parseInt(jQuery.fn.jquery) == 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,"")) < 7.2)) {
				// We'll get our jQuery from Google APIs
				loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
					jQuery172 = jQuery.noConflict(true);
					reChargeThemeFooterJS(jQuery172);
				});
			} else {
				reChargeThemeFooterJS(jQuery);
			}
		})();
