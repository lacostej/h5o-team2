var Html5Oslo = Html5Oslo || {};

Html5Oslo.ratingsHandler = (function() {
    var storage;
    var rateTemplate = '<div class="rating">Rating: {{rating}}</div>';
    var ratingTempalte = '<input id="rating{{index}}" class="rater" name="rating{{index}}" type="range" min="0" max="6" number="1">';
    function renderRatings() {
        $(".post").each(function(indx, pst){
            var allPosts = storage.posts();
            var rating = -1;
            var currentPost;
            for (var i=0,li=allPosts.length; i<li; i++) {
                if (allPosts[i].id == pst.getAttribute("rel")) {
                    currentPost = allPosts[i];
                    rating = currentPost.rating;
                    break;
                }
            }
	        var ratingHtml = Mustache.to_html(rateTemplate,{rating: rating}) + Mustache.to_html(ratingTempalte, {});
	        $(pst).append(ratingHtml);
	        var rtr = $(pst).find(".rater")[0];
	        rtr.value = rating;
	        $(rtr).bind("change", function(evnt){
	            var rating = evnt.target.value;
	            storage.rate(currentPost, rating);
			    $(pst).find(".rating").html(Mustache.to_html(rateTemplate, {rating: rating}));
	        });
	    });                
    };
    function init(store) {
        storage = store;
        renderRatings();
	}
	return {
	    init: init,
	    render: renderRatings
	}
})();

