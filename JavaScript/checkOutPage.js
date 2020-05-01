// ######################## Visual methods ##############################

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

// ######################## Validation methods ##############################

// Checks if user enter the right info
function checkIfValidInputs()
{
    // Resets all red boxes
    unRedAll();
    // Check if textboxes are empty
    let result = 0;
    result += emptyShippingBoxes();
    
    let totalLeft = getNonDollar("checkoutTotalPrice");
    // total 0 means that gift card covers entire cost, so
    // no need to enter billing and cc info
    if (totalLeft != 0)
        result += emptyBillingBoxes();
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
            result += checkNumbers("billingzip",5);
    }
    if (result > 0)
    {
        alert("Please fix your information");
        return false;
    }
    return true;
}

// Checks if gift card option was selected, textbox is filled properly, and/or gift card exists
// Performs necessary changes as well like red textboxes or change of total price calculation
function checkGiftCard()
{
    // Resets all red boxes
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
                        document.getElementById("giftcard").innerHTML = "-$" + totalValue.toFixed(2);
                    }
                    else
                    {
                        document.getElementById("checkoutTotalPrice").innerHTML = "$" + newTotal.toFixed(2);
                        document.getElementById("giftcard").innerHTML = "-$" + giftValue.toFixed(2);
                    }
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

// ######################## Getters + Calculators methods ##############################

// Gets text price as float number without "$"
function getNonDollar(doc)
{
    let item = document.getElementById(doc).textContent;
    let index = item.indexOf("$");
    return parseFloat(item.substr(index+1));
}

function getFromPage()
{
    return "checkOut";
}

// Returns the amount paid
function getAmount()
{
    return localStorage.getItem("totalPrice");
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

// ######################## Load Page  ##############################

// Loads the page on start
function loadCheckOutPage()
{
    displayCartItems();
}

