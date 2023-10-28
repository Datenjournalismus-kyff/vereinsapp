<!DOCTYPE html>
<html>
<head>
	<title>Passwortgeschützte Seite</title>
	<script src="script.js"></script>
</head>
<body>
	<h1>Willkommen auf der passwortgeschützten Seite</h1>
	<form>
		<label for="password">Passwort:</label>
		<input type="password" id="password" name="password">
		<button type="button" onclick="checkPassword()">Einloggen</button>
	</form>
	<div id="message"></div>
</body>
</html>


function checkPassword() {
	var password = document.getElementById("password").value;
	if (password == "meinPasswort") {
		window.location.href = "geschuetzteSeite.html";
	} else {
		document.getElementById("message").innerHTML = "Falsches Passwort. Bitte versuchen Sie es erneut.";
	}
}