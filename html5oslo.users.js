var Html5Oslo = Html5Oslo || {};

Html5Oslo.usersHandler = (function() {
	  function onLogin() {
	    updateLoginForm(document.forms.loginForm.login.value);
      }
	  function updateLoginForm(username) {
	    $("#logoutForm").removeClass("hide");
	    $("#loginForm").addClass("hide");
		localStorage.setItem("username", username);
		document.getElementById("username").innerHTML=localStorage.getItem("username");
		document.body.focus();
		if (isAdmin()) {
		  jQuery('.editPost1').show();
		}
	  }
	  function onLogout() {
	    $("#loginForm").removeClass("hide");
	    $("#logoutForm").addClass("hide");
		localStorage.removeItem("username");
        jQuery('.editPost1').hide();
		
	  }
	  function isLoggedIn() {
	    return localStorage.getItem("username") != null;
	  }
	  function isAdmin() {
	    return localStorage.getItem("username") == "admin";
	  }
	  function init() {
	    if (isLoggedIn()) {
		  updateLoginForm(localStorage.getItem("username"));
		} else {
		  onLogout();
		}
	  }
	return {
	    onLogin: onLogin,
	    onLogout: onLogout,
		isLoggedIn: isLoggedIn,
		isAdmin: isAdmin,
		init: init
	}
})();

