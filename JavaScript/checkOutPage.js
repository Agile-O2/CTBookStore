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

//Select the year and month for the credit card
$(document).ready(function() {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var qntYears = 10;
	var selectYear = $("#year");
	var selectMonth = $("#month");
	var currentYear = new Date().getFullYear();
	
	for (var y = 0; y < qntYears; y++){
		let date = new Date(currentYear);
		var yearElem = document.createElement("option");
		yearElem.value = currentYear 
		yearElem.textContent = currentYear;
		selectYear.append(yearElem);
		currentYear++;
	} 
	
	for (var m = 0; m < 12; m++){
		let monthNum = new Date(2018, m).getMonth()
		let month = monthNames[monthNum];
		var monthElem = document.createElement("option");
		monthElem.value = monthNum; 
		monthElem.textContent = month;
		selectMonth.append(monthElem);
	}

	var d = new Date();
	var month = d.getMonth();
    var year = d.getFullYear();
   
    selectYear.val(year); 
    selectYear.on("change", AdjustDays);  
    selectMonth.val(month);    
    selectMonth.on("change", AdjustDays);

    AdjustDays();
    selectDay.val(day)
    
	function AdjustDays(){
		var year = selectYear.val();
		var month = parseInt(selectMonth.val()) + 1;
		selectDay.empty();
	}    
});