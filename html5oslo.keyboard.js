var Html5Oslo = Html5Oslo || {};

Html5Oslo.keyboardHandler = (function() {

function init()
{
    var allPosts, curPost, prevPost, pageOffset, help;
    curPost = -1;
    prevPost = -1;
    pageOffset = 100;

    function addGlobalStyle(css) 
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head)
        {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function findPos(obj)
    {
        var curleft, curtop;
        curleft = 0;
        curtop = 0;
        if (obj.offsetParent)
        {
            do 
            {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    }


    // Get all posts on page an store in array
    function GetAllPosts()
    {
        allPosts = document.evaluate(
            '//article[contains(@class, "post")]',
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    }

    function HighlightCurrentPost()
    {
        var theItem, pos;
        if (prevPost >= 0)
        {
            theItem = allPosts.snapshotItem(prevPost);
            theItem.className = theItem.className.replace(" currentPost", "");
        }
        if (curPost >= 0)
        {
            theItem = allPosts.snapshotItem(curPost);
            if (theItem.className.indexOf("currentPost") === -1)
            {
                theItem.className += " currentPost";
                pos = findPos(theItem);
                window.scroll(pos[0], pos[1] - pageOffset);
                theItem.focus();
            }
        }
    }
    
    // Key press action
    function KeyPressed(event)
    {
        var postLinks, thisLink, i;
	    var theKey = event.keyCode;
		
		//alert(event.target); 
		// if within an input, discard event
		if (typeof (event.target) == 'object') {
		    if (("" + event.target) == '[object HTMLInputElement]') {
		       return;
		    }
		}
		
        if (theKey === 107)  // k
        {
            if (curPost > 0)
            {
                prevPost = curPost;
                curPost--;
            }
            else
            {
                curPost = 0;
            }
        }
        else if (theKey === 106)  // j
        {
            if (curPost < (allPosts.snapshotLength - 1))
            {
                prevPost = curPost;
                curPost++;
            }
            else
            {
                curPost = (allPosts.snapshotLength - 1);
            }
        }
        else if (theKey === 99)  // c
        {
            if (curPost >= 0 && curPost < allPosts.snapshotLength)
            {
                forms = allPosts.snapshotItem(curPost).getElementsByTagName("form");
                for (i = 0; i < forms.length; i++)
                {
             		   var theForm = jQuery(forms[i]);
         		       theForm.removeClass("hide");
		               theForm.find("input").focus();                    
                }
            }
        }
        else if (theKey === 101)  // e
        {
            if (curPost >= 0 && curPost < allPosts.snapshotLength)
            {
			    if (Html5Oslo.usersHandler.isAdmin()) {
			       Html5Oslo.inlineHandler.SetEditMode($(allPosts.snapshotItem(curPost), ".editPost1"));
				}
            }
        }		else if (theKey === 114)  // r
        {
            if (curPost >= 0 && curPost < allPosts.snapshotLength)
            {
			    alert(event.target);
			    alert($(allPosts).get().length);
                $(allPosts).get().sort(function(a, b) { 
			        alert('sort');
                    var keyA = $(a).children('time').datetime 
                    var keyB = $(b).children('time').datetime
                    if (keyA < keyB) return -1 
                    if (keyA > keyB) return 1 
                    return 0  
                }) /*
                $.each(allPosts, function(index, row) { 
                    $table.children('tbody').append(row) 
})			*/
            }
        }
        else if (theKey === 63 || theKey === 104 || theKey === 27 )  // ? or h or esc
        {
            thisLink = document.evaluate(
                '//div[contains(@class,"banner")]',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (thisLink !== null )
            {
                document.body.removeChild(thisLink);
            }
            else if (theKey != 27)
            {
                document.body.appendChild(help);
            }
        }
        HighlightCurrentPost();
    }
    
    addGlobalStyle(".currentPost { border: #6688ee 2px solid; } \
                    .banner{position:absolute;top:40%;left:15%;margin:0;width:70%;text-align:center;padding:1em;color:#fff} \
                    .banner-background{background:#000;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;-moz-opacity:0.8;opacity:0.8;filter:alpha(opacity=80);z-index:1001;overflow:auto} \
                    .banner-foreground{z-index:1002;text-shadow:#000 1px 1px 7px} \
                    .banner .primary-message,.banner .secondary-message{font-weight:bold;font-family:sans-serif;margin:0} \
                    .banner .primary-message{font-size:200%} \
					ul li { text-align: left;} \
                    .banner .secondary-message{border-top:solid 1px #999;padding-top:0.5em;font-size:150%} \
                    .keyboard-help-banner{top:5%;left:5%;width:90%} \
                    .keyboard-help-banner .secondary-message-parent{padding:0} \
                    .keyboard-help-banner .resized{overflow:auto;overflow-y:auto;overflow-x:hidden} \
                    #keyboard-help{width:100%} \
                    #keyboard-help th{color:#dd0;padding-top:0.5em; width: 50%;} \
                    #keyboard-help .key{text-align:right;font-weight:bold;padding-right:0.25em;white-space:nowrap} \
                    #keyboard-help .desc{text-align:left;font-weight:normal} \
                    #keyboard-help-tearoff-link-container{text-align:center;font-size:90%;margin-top:1em} \
                    #keyboard-help-tearoff-link-container .link{color:#dd0}");
    GetAllPosts();
	//KeyPressed(107); // select first post
    help = document.createElement("div");
    help.className = "banner banner-background keyboard-help-banner";
    help.innerHTML = "<div class='features'><div class='primary-message'>Features</div> \
	                  <ul><li>Multi user editing simulated using persisted login<li>html5 forms and validation<li>canvas (text, transformations + image)<li>reorder elements (drag&drop within page) (NOT YET MERGED)<li>keyboard shortcuts (navigation)<li>WYWIWIG editor with drag and drop pictures<li>video support</ul></div>  \
	                  <div class='primary-message'>Keyboard shortcuts</div> \
                      <div style='height: 120px;' class='secondary-message resized'> \
                      <div id='keyboard-help-container'> \
                      <table id='keyboard-help'> \
                      <tbody><tr> \
                      <th colspan='2'>Navigation</th> \
                      <th colspan='2'>Acting on posts</th> \
                      </tr><tr> \
                      <td class='key'>j/k:</td><td class='desc'>next/previous post</td> \
                      <td class='key'>e:</td><td class='desc'>edit comment</td> \
                      </tr><tr> \
                      <td colspan='2'>&nbsp;</td><td class='key'>c:</td><td class='desc'>add comment</td> \
                      </tr></tbody></table></div></div>";
    document.addEventListener('keypress', function(event) { KeyPressed(event); }, true);
    
	info = document.createElement("p");
	info.className ="notice";
	info.innerHTML = "(press 'h' for help)";
	jQuery(document).find("header[role=banner]").append(info);
}
	return {
	    init: init
	}
})();