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

// Shows cart items on page
function displayCartItems(){

    //get cart from local storage
    let cart = localStorage.getItem("cart"); 
    
    // split contents of cart local storage into 1d array
    let bookList = cart.split('@@@');
    var quantity = [];
    var cList = "";
        
    // Change the 1 outer array into 2 dim array
    // and create a HTML list
    for (let z = 0; z<bookList.length;z++)
    {
        bookList[z] = bookList[z].split('$$$');
        quantity[z] = bookList[z][1]; //count
        let currentBook = StringToJSON(bookList[z][0]);
        cList += "<p>";
        cList += currentBook.title;
        cList += "<span class = 'price'>"
        cList += quantity[z];
        cList += " x $"
        cList += currentBook.price;
        cList += "</span></p>";   
    }
    
    // Get total price
    var cartTotal = parseInt(localStorage.getItem("cartTotal"));
    var tax = 0.0635;
    var shipping = 4.99
    
	// Display the table
	document.getElementById("checkoutList").innerHTML = cList; 
    document.getElementById("checkoutSubtotal").innerHTML = "$" + cartTotal.toFixed(2);
    document.getElementById("taxes").innerHTML = "$" + (cartTotal * tax).toFixed(2);
    document.getElementById("shipping").innerHTML = "$" + 4.99;
    document.getElementById("checkoutTotalPrice").innerHTML = "$" + totalCost();
    localStorage.setItem("totalPrice",((parseInt(cartTotal)* 1.0635)+4.99).toFixed(2));
    
}

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

// Hides gift card textbox on checkmark
function hideGift() {
	var checkBox = document.getElementById("giftCheck");
	var text = document.getElementById("giftcardboxes");
	if (checkBox.checked == true){
		text.style.display = "block";
	} else {
		text.style.display = "none";
        document.getElementById("giftcard").innerHTML = "-$0.00";
        document.getElementById("checkoutTotalPrice").innerHTML = "$" + totalCost();
	}
}

// Checks if user enter the right info
function checkIfValidInputs()
{
    // Resets all red boxes
    unRedAll();
    // Check if textboxes are empty
    let result = 0;
    result += checkEmptyTextBoxes("fname");
    result += checkEmptyTextBoxes("email");
    result += checkEmptyTextBoxes("adr");
    result += checkEmptyTextBoxes("city");
    result += checkEmptyTextBoxes("state");
    result += checkEmptyTextBoxes("zip");
    let totalLeft = getNonDollar("checkoutTotalPrice");
    // total 0 means that gift card covers entire cost, so
    // no need to enter billing and cc info
    if (totalLeft != 0)
    {
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
    }
    if (result > 0)
    {
        alert("Please enter all necessary information");
        return false;
    }
    // Now Checks if inputs are correct
    result += validateEmail("email");
    result += checkNumbers("zip",5);
    // Same idea as above with the if then loops
    if (totalLeft != 0)
    {
        result += checkNumbers("cvv",3);
        if (document.getElementById("myCheck").checked != true)
        {
            result += checkNumbers("billingzip",5);
        }
    }
    if (result > 0)
    {
        alert("Please fix your information");
        return false;
    }
    return true;
}

// Gets text price as float number without "$"
function getNonDollar(doc)
{
    let item = document.getElementById(doc).textContent;
    let index = item.indexOf("$");
    return parseFloat(item.substr(index+1));
}

// Checks if gift card option was selected, textbox is filled properly, and/or gift card exists
// Performs necessary changes as well like red textboxes or change of total price calculation
function checkGiftCard()
{
    unRedAll();
    // Check if giftcard selected and then check if the giftcard input is valid
    let giftCheckDoc = document.getElementById("giftCheck");
    let giftNumDoc = document.getElementById("giftcardnum");
    // Giftcard option selected?
    if (giftCheckDoc.checked == true)
    {
        // Gift card format correct?
        if (giftNumDoc.value.length < 16)
        {
            giftNumDoc.focus();
            giftNumDoc.style.borderColor  = "red";
            alert("Please enter correct card number");
            //return false;
        }
        else
        {
            // Looks for specifc giftcard
            let allGiftCards = getAllItems("giftcards");
            let i = 0;
            for (i = 0; i < allGiftCards.length; i++)
            {
                if(allGiftCards[i].code == giftNumDoc.value)
                {
                    giftNumDoc.style.borderColor  = "";
                    let giftValue = allGiftCards[i].value;
                    let totalValue = getNonDollar("checkoutSubtotal") + getNonDollar("shipping") + getNonDollar("taxes");            
                    let newTotal = totalValue - giftValue
                    if (newTotal < 0)
                    {
                        document.getElementById("checkoutTotalPrice").innerHTML = "$0.00";
                    }
                    else
                    {
                        document.getElementById("checkoutTotalPrice").innerHTML = "$" + newTotal.toFixed(2);
                    }
                    document.getElementById("giftcard").innerHTML = "-$" + giftValue.toFixed(2);
                    // Get the snackbar DIV
                    var x = document.getElementById("snackbar");

                    // Add the "show" class to DIV
                    var snackBarText = "$" + giftValue.toFixed(2) + " Gift Card Applied";
                    x.innerHTML = snackBarText;
                    x.className = "show";
                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    return;
                }
            }
            giftNumDoc.focus();
            giftNumDoc.style.borderColor  = "red";
            alert("Card not found");
        }
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

// Prepares info to be stored on localstorage
function getInputInfo(){
    let orderInfo =[getDocVal("fname"),getDocVal("email"),localStorage.getItem("totalPrice")];
    
    // Turn inner elements into strings separated by $$$
    orderInfo = orderInfo.join('$$$');
    return orderInfo;
}

function getDocVal(doc)
{
    return document.getElementById(doc).value;
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
    displayCartItems();
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

// Calculates Total
function totalCost()
{
    let tax = getNonDollar("taxes");
    let cartValue = getNonDollar("checkoutSubtotal");
    let shipping = getNonDollar("shipping");
    let giftcard = getNonDollar("giftcard");
    let total = cartValue + shipping + tax - giftcard;
    return total.toFixed(2);
}
