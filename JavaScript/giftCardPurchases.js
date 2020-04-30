function checkIfDone()
{
    if (checkIfAmountSelected() == false)
        return false;
    checkIfValidInputs();
}

// Checks if user enter the right info
function checkIfValidInputs()
{
    unRedAll();
    if (checkIfAmountSelected() == false)
        return false;
    
    // Check if textboxes are empty
    let result = 0;
    result += emptyShippingBoxes();
    result += emptyBillingBoxes();
    
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
        result += checkNumbers("billingzip",5);
    
    if (result > 0)
    {
        alert("Please fix your information");
        return false;
    }
    
    return true;
}

// Check if amount for gift card is selected
function checkIfAmountSelected()
{
    var textboxes = document.getElementsByTagName('input');
    for(var i in textboxes)
        if(textboxes[i].type == "radio")
            if (textboxes[i].checked == true)
                return true;            
    alert("Please Select Amount");
    return false;
        
}

// Returns the amount paid
function getAmount()
{
    var radioButton = document.getElementsByName('Set1');
	var radioValue;
	
	for(var i = 0; i < radioButton.length; i++)
		if(radioButton[i].checked)
			return radioButton[i].value;
    return 0;
}

// Loads the page on start
function loadGiftCardPurchases()
{
    console.log();
}