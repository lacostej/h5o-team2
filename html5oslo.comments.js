var Html5Oslo = Html5Oslo || {};

Html5Oslo.commentsHandler = (function(){
    var commentTemplate = '<li class="comment"><strong>{{name}}</strong> said:<br> <span class="quote">{{content}}</span></li>';
    var feedbackTemplate = '<article role="feedback">' +
    '<header>' +
    '<a id="{{index}}" class="addCommentAction"  href="#">Give feedback!</a>' +
    '</header>' +
    '<form id="commentForm{{index}}" role="addComment" class="hide">' +
        '<label for="name{{index}}">Name:</label>' +
        '<input id="name{{index}}" type="text" name="name{{index}}" required><br>' +
        '<label for="comment{{index}}">Comment:</label>' +
        '<textarea id="comment{{index}}" name="comment{{index}}" class="addCommentText" required></textarea>' +
        '<input type="submit" value="comment">' +
    '</form>' +
    '</article>';
    var storage;
	function addFeedbackFields(){
	    $(".post").each(function(indx, pst){
	        var feedbackHtml = Mustache.to_html(feedbackTemplate, {index: indx});
	        $(pst).append(feedbackHtml);
	        $(pst).find(".addCommentAction").each(function(i,e){
	            $(e).click(showIt);
	        });
	        $(pst).submit(function(evnt, data){
	            var frm = evnt.target;
	            var name = $(frm).find(":text")[0];
	            var content = $(frm).find("textarea")[0];
	            addComment(pst, name.value, content.value);
	            name.value = content.value = "";
	            $(pst).find(".addCommentAction").each(function(indx,elm){
	                $(elm).trigger("click");
	            });
	            return false;
	        });
            $(".addCommentAction").click(showIt);
	    });
	};
	function hideIt(ev) {
		$("#commentForm" + this.id).removeClass("show");	
		$("#commentForm" + this.id).addClass("hide");	
		$(this).html("Give feedback!");
		$(this).click(showIt);
	}
	function showIt(ev) {
	    var frm = $("#commentForm" + this.id);
		frm.removeClass("hide");
		frm.addClass("show");	
		frm.find(":text")[0].focus();
		$(this).html("I changed my mind..");
		$(this).click(hideIt);
	};
	
	function addComment(post, n,c) {
	    $(post).find(".comments").each(function(indx,elm){
	        var comment = {name: n, content: c};
	        storage.saveComment(post.getAttribute("rel"), comment);
	        $(elm).append(Mustache.to_html(commentTemplate,comment));
	    });
	};
	function renderComment(post, comment) {
	    $(post).find(".comments").each(function(indx,elm){
	        $(elm).append(Mustache.to_html(commentTemplate,comment));
	    });
	};
    return {
        addComment: addComment,
        renderComment: renderComment,
        hideIt: hideIt,
        showIt: showIt,
        addFeedbackFields: addFeedbackFields,
        init: function(s){
            storage = s;
        }
    };
})();
