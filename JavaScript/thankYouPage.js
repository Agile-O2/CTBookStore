getPurchaseInfo();

function getPurchaseInfo(){
    let allInfo = sessionStorage.getItem("confirmedOrder");
    allInfo = allInfo.split("$$$");
    var fname=allInfo[0];
    var email=allInfo[1];
    var orderNum =allInfo[2];
    var totalPrice=allInfo[3];
    
    document.getElementById("custName").innerHTML = "Thank You, " + fname + " !";
    document.getElementById("custEmail").innerHTML = email;
    document.getElementById("oNum").innerHTML = orderNum;
    document.getElementById("tPrice").innerHTML = totalPrice;
}