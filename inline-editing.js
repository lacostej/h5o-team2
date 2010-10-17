        function SetReadonlyMode(obj) {
            jQuery(obj).parent().find('h2').removeAttr('contenteditable');
            jQuery(obj).parent().find('p').removeAttr('contenteditable');
            jQuery(obj).parent().find('.editPost1').show();
            jQuery(obj).parent().find('.savePost1').hide();
            jQuery(obj).parent().find('.cancelPost1').hide();
            jQuery('#headingSizeSlider').hide();
        }
        function SetEditMode(obj) {
            jQuery(obj).parent().find('h2').attr('contenteditable', 'true');
            jQuery(obj).parent().find('p').attr('contenteditable', 'true');
            jQuery(obj).parent().find('.editPost1').hide();
            jQuery(obj).parent().find('.savePost1').show();
            jQuery(obj).parent().find('.cancelPost1').show();
            jQuery('#headingSizeSlider').show();
        }
        function InitInlineEditingFunctions() {
            jQuery('#headingSizeSlider').hide();
            jQuery('.savePost1').hide();
            jQuery('.cancelPost1').hide();
			if (!Html5Oslo.usersHandler.isAdmin())
			{
				jQuery('.editPost1').hide();
			}
            jQuery('.editPost1').click(function () {
                if (jQuery(this).text() == 'Edit') {
                    SetEditMode(this);
                }
                else {
                    SetReadonlyMode(this);
                }
            });

            jQuery('.savePost1').click(function () {
                var h2 = jQuery(this).parent().find('h2');
                var p = jQuery(this).parent().find('p');
                localStorage.setItem("heading", h2.text());
                localStorage.setItem("p", p.text());
                var heading = localStorage["heading"];
                var p = localStorage["p"];
                SetReadonlyMode(this);
            });

            jQuery('.cancelPost1').click(function () {
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
            //alert(el);

//            /* This is no need but its cool to see how much we slide */
//            document.getElementById('rounded-border-value').innerHTML = borderVal;

            el.style.fontSize = selectedSize + 'px';
        }