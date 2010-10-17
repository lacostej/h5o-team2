var Html5Oslo = Html5Oslo || {};

Html5Oslo.usersHandler = (function() {
	  function onLogin() {
	    $("#logoutForm").removeClass("hide");
	    $("#loginForm").addClass("hide");
		localStorage.setItem("username", document.forms.loginForm.login.value);
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
	  }
	  function isLoggedIn() {
	    return localStorage.getItem("username") != null;
	  }
	  function isAdmin() {
	    return localStorage.getItem("username") == "admin";
	  }
	return {
	    onLogin: onLogin,
	    onLogout: onLogout,
		isLoggedIn: isLoggedIn,
		isAdmin: isAdmin
	}
})();

