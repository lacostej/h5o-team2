var Html5Oslo = Html5Oslo || {};

Html5Oslo.storage = (function() {
    var store;
    var repo;
    var blogRepo = {posts: []};
    function clear() {
        repo.clear();
    };
    function saveComment(id, obj) {
        if (obj.name) {
            $(blogRepo.posts).each(function(indx,p){
                if (id == p.id) {
                    p.comments.push(obj);
                    autoSave();
                }
            });
        }    
    };
    function saveRating(pst,rat) {
        $(blogRepo.posts).each(function(i,o){
            if (o.id == pst.id) {
                o.rating = rat
                autoSave();
                return;
            }
        });
        
    };
    function savePost(obj) {
        if (obj.title) {
            blogRepo.posts.push(obj);
        }
        autoSave();
    };
    function init() {
        store = localStorage;
        repo = sessionStorage;
        if (!repo.blogRepo) {
            autoSave();
        } else {
            blogRepo = JSON.parse(repo.blogRepo);
        }
    };
    function autoSave(){
        repo.setItem("blogRepo", JSON.stringify(blogRepo));
    };
    function listPosts(){
        return blogRepo.posts;
    };
    function listComments(){
        //return blogRepo.comments;
    };
    return {
        init: init,
        savePost: savePost,
        saveComment: saveComment,
        comments: listComments,
        posts: listPosts,
        clear: clear,
        rate: saveRating
    }
})();
