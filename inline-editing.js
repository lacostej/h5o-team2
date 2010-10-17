var Html5Oslo = Html5Oslo || {};
Html5Oslo.inlineHandler = (function() {
    var store;
    function SetReadonlyMode(obj) {
        var prnt = $(obj).parent();
        prnt.find('h2').removeAttr('contenteditable');
        prnt.find('p').removeAttr('contenteditable');
        prnt.find('.editPost1').show();
        prnt.find('.savePost1').hide();
        prnt.find('.cancelPost1').hide();
        $('#headingSizeSlider').hide();
    }
    function SetEditMode(obj) {
        var prnt = $(obj).parent();
        prnt.find('h2').attr('contenteditable', 'true');
        prnt.find('p').attr('contenteditable', 'true');
        prnt.find('.editPost1').hide();
        prnt.find('.savePost1').show();
        prnt.find('.cancelPost1').show();
        $('#headingSizeSlider').show();
    }
    function InitInlineEditingFunctions(s) {
        store = s;
        $('#headingSizeSlider').hide();
        $('.savePost1').hide();
        $('.cancelPost1').hide();
        if (!Html5Oslo.usersHandler.isAdmin())
		{
			jQuery('.editPost1').hide();
		}
        $('.editPost1').click(function () {
            if ($(this).text() == 'Edit') {
                SetEditMode(this);
            }
            else {
                SetReadonlyMode(this);
            }
        });
        $('.savePost1').click(function () {
            var h2 = $(this).parent().find('h2');
            var p = $(this).parent().find('p');
            var art = $(this).parent().parent();
            $(store.posts()).each(function(i,pst) {
                if (pst.id == art.attr("rel")) {
                    pst.title = h2.text();
                    pst.content = p.text();
                    store.savePost(pst);
                    SetReadonlyMode(this);
                    return;
                }
            });
            SetReadonlyMode(this);
        });

        $('.cancelPost1').click(function () {
            SetReadonlyMode(this);
        });

        var dropzone = document.getElementById('drop1');
        // FIXME multiple drop1
        console.log(dropzone.innerHTML);
		// doesnt work on opera ??
		// http://www.thebuzzmedia.com/html5-drag-and-drop-and-file-api-tutorial/
        dropzone.addEventListener("dragover", function (event) {
		    console.log("bou");
            event.preventDefault();
        }, true);
        dropzone.addEventListener("drop", function (event) {
            event.preventDefault();
            var files = event.dataTransfer.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                alert(file.name);
                // For Firefox, Chrome and Safari
                var xhr = new XMLHttpRequest();
                xhr.open("post", "/upload.aspx", true);
                xhr.onreadystatechange = function () {
                    alert(this.readyState);
                    if (this.readyState === 4) {
                        // File uploaded
                    }
                    else {
                        //alert('test');
                    }
                };
            }
            // Ready to do something with the dropped object
        }, true);
    }

    function changeHeadingSize() {
        var el = document.getElementById('h');
        var selectedSize = document.getElementById('headingsize').value;
//            /* This is no need but its cool to see how much we slide */
//            document.getElementById('rounded-border-value').innerHTML = borderVal;

        el.style.fontSize = selectedSize + 'px';
    }
    return {
        changeHeadingSize: changeHeadingSize,
        InitInlineEditingFunctions: InitInlineEditingFunctions,
        SetReadonlyMode: SetReadonlyMode,
        SetEditMode: SetEditMode
    };
})();
