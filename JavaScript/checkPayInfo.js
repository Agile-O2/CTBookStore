/* ######################### Functional Methods ########################### */

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

// Prepares info to be stored on localstorage
function getInputInfo(){
    let amount = getAmount();
    let orderInfo =[getDocVal("fname"),getDocVal("email"), amount];
    
    // Turn inner elements into strings separated by $$$
    orderInfo = orderInfo.join('$$$');
    return orderInfo;
}

/* ######################### Validation Methods ########################### */

// Checks all basic shipping boxes
function emptyShippingBoxes()
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
    return result;
}

// Checks billing and cc info
function emptyBillingBoxes()
{
    let result = 0;
    result += checkEmptyTextBoxes("cname");
    result += checkEmptyTextBoxes("ccnum");
    result += checkEmptyTextBoxes("cvv");
    // If billing address is different
    if (document.getElementById("myCheck").checked != true)
    {
        result += checkEmptyTextBoxes("billingfname");
        result += checkEmptyTextBoxes("billingadr");
        result += checkEmptyTextBoxes("billingcity");
        result += checkEmptyTextBoxes("billingstate");
        result += checkEmptyTextBoxes("billingzip");
    }
    return result;
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

/* ######################### Textbox Filters Methods ########################### */

// Checks if typed character is letter
function lettersOnly() 
{
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32 || charCode == 39)
        return true;
    else
        return false;
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

/* ######################### Function Helper Methods ########################### */

// To get document values shorter
function getDocVal(doc)
{
    return document.getElementById(doc).value;
}

/* ######################### HTML Visual Page Modifiers Methods ########################### */

// This function will hide the text field on checked
function hideInfo() {
	var checkBox = document.getElementById("myCheck");
	var text = document.getElementById("text");
	if (checkBox.checked == true){
		text.style.display = "none";
	} else {
		text.style.display = "block";
	}
}

// Makes all textbox clear before checking them
function unRedAll()
{
    var textboxes = document.getElementsByTagName('input');
    for(var i in textboxes)
    {
        if(textboxes[i].type == "text")
        {
            textboxes[i].style.borderColor="";
        }
    }
}

//Select the year and month for the credit card
$(document).ready(function() 
{
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var qntYears = 10;
    var selectYear = $("#year");
    var selectMonth = $("#month");
    var currentYear = new Date().getFullYear();

    for (var y = 0; y < qntYears; y++)
    {
        let date = new Date(currentYear);
        var yearElem = document.createElement("option");
        yearElem.value = currentYear 
        yearElem.textContent = currentYear;
        selectYear.append(yearElem);
        currentYear++;
    } 

    for (var m = 0; m < 12; m++)
    {
        let monthNum = new Date(2018, m).getMonth()
        let month = monthNames[monthNum];
        var monthElem = document.createElement("option");
        monthElem.value = monthNum; 
        monthElem.textContent = month;
        selectMonth.append(monthElem);
    }
});
