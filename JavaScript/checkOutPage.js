// This function will return to the previous website
function goBack() {
	window.history.back();
}

// this window displays alert box after clicking on submit button
function displaySuccess() {
    if (checkIfValidInputs()){
        sessionStorage.setItem("confirmedOrder",getInputInfo()); 
        window.location.href = "thankYouPage.html";
        alert("Thank you for your purchase!");
    }
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

function hideGift() {
	var checkBox = document.getElementById("giftCheck");
	var text = document.getElementById("giftcardboxes");
	if (checkBox.checked == true){
		text.style.display = "block";
	} else {
		text.style.display = "none";
	}
}

// Checks if user enter the right info
function checkIfValidInputs()
{
    // Check if textboxes are empty
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
    // If billing address is different
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
    // Now Checks if inputs are correct
    result += validateEmail("email");
    result += checkNumbers("zip",5);
    result += checkNumbers("cvv",3);
    if (document.getElementById("myCheck").checked != true)
    {
        result += validateEmail("billingemail");
        result += checkNumbers("billingzip",5);
    }
    if (result > 0)
    {
        alert("Please fix your information");
        return false;
    }
    return true;
}

function getInputInfo(){
    let orderInfo =[document.getElementById("fname").value,document.getElementById("email").value,"123456789",localStorage.getItem("totalPrice")];
    
    // Turn inner elements into strings separated by $$$
    orderInfo = orderInfo.join('$$$');
    return orderInfo;
    
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
// Checks if email format is good
function validateEmail(email)
{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailDoc = document.getElementById(email);
    if(emailDoc.value.match(mailformat))
    {
        emailDoc.style.borderColor  = "";
        return 0;
    }
    else
    {
        emailDoc.focus();
        emailDoc.style.borderColor  = "red";
        return 1;
    }
}

// Checks if enough numbers are entered
function checkNumbers(textbox,goalLength)
{
    if (document.getElementById(textbox).value.length == goalLength)
    {
        document.getElementById(textbox).style.borderColor  = "";
        return 0;
    }
    else
    {
        document.getElementById(textbox).focus();
        document.getElementById(textbox).style.borderColor  = "red";
        return 1;
    }
}

// Checks if typed character is number
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) ){
        return false;
    }
    return true;
}

// Checks if typed character is letter
function lettersOnly() 
{
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32 || charCode == 39)
        return true;
    else
        return false;
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