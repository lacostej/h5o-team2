var Html5Oslo = Html5Oslo || {};

Html5Oslo.commentsHandler = (function(){
    var commentTemplate = '<li><strong>{{name}}</strong> said <span class="quote">{{content}}</span></li>';
    var feedbackTemplate = '<article role="feedback">' +
    '<header>' +
    '<a id="{{index}}" class="addCommentAction"  href="#">Give feedback!</a>' +
    '</header>' +
    '<form id="commentForm{{index}}" role="addComment" class="hide">' +
        '<label for="name{{index}}">Name:</label>' +
        '<input id="name{{index}}" type="text" name="name{{index}}" required>' +
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
	    });
	};
	function hideIt(ev) {
		$("#commentForm" + this.id).removeClass("show");	
		$("#commentForm" + this.id).addClass("hide");	
		$(this).html("Give feedback!");
		$(this).click(showIt);
	}
	function showIt(ev) {
		$("#commentForm" + this.id).removeClass("hide");	
		$("#commentForm" + this.id).addClass("show");	
		$(this).html("I changed my mind..");
		$(this).click(hideIt);
	};
	
	function addComment(post, n,c) {
	    $(post).find(".comments").each(function(indx,elm){
	        var comment = {name: n, content: c};
	        console.log("save comment----:"+post.getAttribute("rel"));
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
            console.log("Store:" + s);
            storage = s;
            var storedComments = storage.comments();
/*            for (var i =0,li = storedComments.length; i < li; i++) {
                $(elm).append(Mustache.to_html(commentTemplate,storedComments[i]));
            }*/
            addFeedbackFields();
            $(".addCommentAction").click(showIt);
        }
    };
})();
