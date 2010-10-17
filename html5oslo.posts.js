var Html5Oslo = Html5Oslo || {};

Html5Oslo.postsHandler = (function() {
    var ratingsHandler, commentsHandler, store;
    function renderPost() {
        var posts = store.posts();
        for (var i=0, li = posts.length; i <li; i++) {
            var aPost = posts[i];
            var obj = $("#content").append(Mustache.to_html(postTemplate, aPost));
            var comments = aPost.comments;
            console.log("comments: " + comments.length);
            if (comments.length > 0) {
                for (var j=0, lli = comments.length; j<lli; j++) {
	                commentsHandler.renderComment($(obj), comments[j]);
	            }
            }
        }
        ratingsHandler.render();
    };
    function init(s, r, c) {
        store = s;
        ratingsHandler = r;
        commentsHandler = c;
    };
    return {
        render: renderPost,
        init: init
    };
})();
