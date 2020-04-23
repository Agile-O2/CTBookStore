//This function will return to the previous website
function goBack() {
	window.history.back();
}

//this window displays alert box after clicking on submit button
function displaySuccess() {
	alert("Thank you for your purchases!");
}

//this function will hide the text field on checked
function hideInfo() {
	var checkBox = document.getElementById("myCheck");
	var text = document.getElementById("text");
	if (checkBox.checked == true){
		text.style.display = "none";
	} else {
		text.style.display = "block";
	}
}