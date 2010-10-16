var Html5Oslo = Html5Oslo || {};

Html5Oslo.ratingsHandler = (function() {
    var rateTemplate = '<div class="rating">Rating: {{rating}}</div>';
    var ratingTempalte = '<input id="rating{{index}}" class="rater" name="rating{{index}}" type="range" min="0" max="6" number="1">';
    function init(store) {
        console.log("Ratings:" + store);
	    $(".post").each(function(indx, pst){
	        var ratingHtml = Mustache.to_html(rateTemplate,{rating: 0}) + Mustache.to_html(ratingTempalte, {});
	        $(pst).append(ratingHtml);
	        $($(pst).find(".rater")[0]).bind("change", function(evnt){
	            var rating = evnt.target.value;
			    $(pst).find(".rating").html(Mustache.to_html(rateTemplate, {rating: rating}));
	        });
	    });
	}
	return {
	    init: init
	}
})();

