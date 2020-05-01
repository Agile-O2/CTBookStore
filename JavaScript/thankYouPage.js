// Diplay Info
function getPurchaseInfo()
{
    localStorage.removeItem('cart');
    let allInfo = sessionStorage.getItem("confirmedOrder");
    allInfo = allInfo.split("$$$");
    var fname=allInfo[0];
    var email=allInfo[1];
    var totalPrice=allInfo[2];
    var from=allInfo[3];
    
    document.getElementById("custName").innerHTML = "Thank You, " + fname + " !";
    document.getElementById("custEmail").innerHTML = email;
    document.getElementById("oNum").innerHTML = generateRandomOrderNumber();
    document.getElementById("tPrice").innerHTML = totalPrice;
    console.log(from);
    if (from == "giftCard")
        document.getElementById("giftCard").innerHTML = "GiftCard Code: " + generateRandomGiftCardNumber(16);
    else
        document.getElementById("giftCard").style.display = "none";
}
// Generates Gift Card Code
function generateRandomGiftCardNumber(length)
{
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
    console.log(result);
   return result;
}
// Generates Order Number Code
function generateRandomOrderNumber()
{
    return Math.floor(Math.random() * 9000000) + 1000000;
}
// Loads the page
function loadThankYouPage()
{
    getPurchaseInfo();
}