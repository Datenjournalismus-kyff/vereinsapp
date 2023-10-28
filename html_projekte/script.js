function checkPassword() {
	var password = document.getElementById("password").value;
	if (password == "zwen") {
		window.location.href = "Test.html";
	} else {
		document.getElementById("message").innerHTML = "Falsches Passwort. Bitte versuchen Sie es erneut.";
	}
}