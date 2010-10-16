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
            console.log("saving comment...storage:" + id);
            $(blogRepo.posts).each(function(indx,p){
                console.log(p.id + " == " + id);
                if (id == p.id) {
                    console.log("Found post, saving comment");
                    p.comments.push(obj);
                    autoSave();
                }
            });
            console.log("-_____--");
        }    
    };
    function savePost(obj) {
        if (obj.title) {
            console.log("save...post");
            blogRepo.posts.push(obj);
        }
        autoSave();
    };
    function init() {
        store = sessionStorage;
        repo = localStorage;
        if (!repo.blogRepo) {
            console.log("Emnpty repo");
            autoSave();
        } else {
            blogRepo = JSON.parse(repo.blogRepo);
            console.log(blogRepo.posts.length);
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
        clear: clear
    }
})();
