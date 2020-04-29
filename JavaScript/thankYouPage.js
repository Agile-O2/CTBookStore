getPurchaseInfo();

function getPurchaseInfo()
{
    localStorage.removeItem('cart');
    let allInfo = sessionStorage.getItem("confirmedOrder");
    allInfo = allInfo.split("$$$");
    var fname=allInfo[0];
    var email=allInfo[1];
    var totalPrice=allInfo[2];
    
    document.getElementById("custName").innerHTML = "Thank You, " + fname + " !";
    document.getElementById("custEmail").innerHTML = email;
    document.getElementById("oNum").innerHTML = generateRandomOrderNumber();
    document.getElementById("tPrice").innerHTML = totalPrice;
}

function generateRandomOrderNumber()
{
    return Math.floor(Math.random() * 9000000) + 1000000;
}