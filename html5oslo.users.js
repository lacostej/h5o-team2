var Html5Oslo = Html5Oslo || {};

Html5Oslo.usersHandler = (function() {
	  function onLogin() {
	    $("#logoutForm").removeClass("hide");
	    $("#loginForm").addClass("hide");
		localStorage.setItem("username", document.forms.loginForm.login.value);
		document.getElementById("username").innerHTML=localStorage.getItem("username");
		document.body.focus();
	  }
	  function onLogout() {
	    $("#loginForm").removeClass("hide");
	    $("#logoutForm").addClass("hide");
		localStorage.removeItem("username");
	  }
	return {
	    onLogin: onLogin,
	    onLogout: onLogout
	}
})();

