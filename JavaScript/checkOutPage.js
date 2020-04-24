// This function will return to the previous website
function goBack() {
	window.history.back();
}

// this window displays alert box after clicking on submit button
function displaySuccess() {
    if (checkIfValidInputs())
        alert("Thank you for your purchases!");
}

// this function will hide the text field on checked
function hideInfo() {
	var checkBox = document.getElementById("myCheck");
	var text = document.getElementById("text");
	if (checkBox.checked == true){
		text.style.display = "none";
	} else {
		text.style.display = "block";
	}
}
// Checks if user enter the right info
function checkIfValidInputs()
{
    let result = 0;
    result += checkEmptyTextBoxes("fname");
    result += checkEmptyTextBoxes("email");
    result += checkEmptyTextBoxes("adr");
    result += checkEmptyTextBoxes("city");
    result += checkEmptyTextBoxes("state");
    result += checkEmptyTextBoxes("zip");
    result += checkEmptyTextBoxes("cname");
    result += checkEmptyTextBoxes("ccnum");
    result += checkEmptyTextBoxes("expmonth");
    result += checkEmptyTextBoxes("expyear");
    result += checkEmptyTextBoxes("cvv");
    if (document.getElementById("myCheck").checked != true)
    {
        result += checkEmptyTextBoxes("billingfname");
        result += checkEmptyTextBoxes("billingemail");
        result += checkEmptyTextBoxes("billingadr");
        result += checkEmptyTextBoxes("billingcity");
        result += checkEmptyTextBoxes("billingstate");
        result += checkEmptyTextBoxes("billingzip");
    }
    if (result > 0)
    {
        alert("Please enter all necessary information");
        return false;
    }
    
    if(!validateEmail("email")) return false;
    if (document.getElementById("myCheck").checked != true)
    {
        if(!validateEmail("billingemail")) return false;
    }
    return true;
}
// Checks if user left an empty box
function checkEmptyTextBoxes(textbox)
{
    if (document.getElementById(textbox).value == "")
    {
        document.getElementById(textbox).focus();
        document.getElementById(textbox).style.borderColor  = "red";
        return 1;
    }
    else
    {
        document.getElementById(textbox).style.borderColor  = "";
        return 0;
    }
}
// ???
// For cleaning textboxes in 
function cleanBillingAddress(textbox)
{
    document.getElementById(textbox).style.borderColor  = "";
    document.getElementById(textbox).value = "";
}
// Checks if email format is good
function validateEmail(email)
{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailDoc = document.getElementById(email);
    if(emailDoc.value.match(mailformat))
    {
        emailDoc.style.borderColor  = "";
        return true;
    }
    else
    {
        emailDoc.focus();
        emailDoc.style.borderColor  = "red";
        return false;
    }
    
}

// Checks if input is number
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) ){
        return false;
    }
    return true;
}

// Loads the page on start
function loadCheckOutPage()
{
    console.log();
}
