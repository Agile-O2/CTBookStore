// Daniel Pobidel
var cartList; 
var count;
var totalprice;
updateCartDisplay();

// Sends selected book from the cartList to another page
function cartPassInfo(clickedBook)
{
	// Changes from JSON/Book object to string while conservating format
    var book = BookToString(cartList[clickedBook.closest("tr").rowIndex-1]);
    console.log(book);
    
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
    
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the cartList of given books on table
function printCartTable()
{
    if (cartList.length == 0){
        console.log("cart is empty");
        var table = "<tr><th style='text-align:center'> Your Cart is Empty </th></tr>";
        table += "<tr><td style='text-align:center'> <a href='productPage.html'>Click here to Shop now</a> </td> </tr>";
    }
    else{
       // Creates a table for book cartList display
	   var table="<tr><th></th><th>Title</th><th>Author</th><th>&nbsp;Price&nbsp;</th><th>Quantity</th></tr>";
       let i;
	   // Adds all necessary info to all books that match with the search and then displays it as table
	   for (i = 0; i <cartList.length; i++) 
       { 
		  table += "<tr><td onclick='cartPassInfo(parentNode)' ref='a.html' id='pic'>";
		  table += "<img src='/";
		  table += cartList[i].image;
		  table += "'/>";
          table += "</td><td>";
		  table += cartList[i].title;
		  table += "</td><td>";
          table += cartList[i].author;
          table += "</td><td>$";
		  table += cartList[i].price;
          table += "</td><td><button type='button' name='minusButton' onclick='decrementBookCount(this)'>"
          table += " - </button>";
          table += "x";
		  table += count[i];
          table += "<button class='plus-btn' type='button' name='plusButton' onclick='incrementBookCount(this)'>"
          table += " + </button> &nbsp;<button onclick='removeBook(this)' id='removeBtn'>Remove</button></td></tr>";
	   }
        table += "<tr><td><button onclick='clearCart()' id='clearBtn' >Clear Cart</button></td><td></td><td> Total Price: </td> <td> $"
        table += calcTotal();
        table += "</td><td><a href='checkOutPage.html' class='checkOutbtn'>Check Out </a></td></tr>"
    }
	// Display the table
	document.getElementById("cartTable").innerHTML = table;  
}

// Creates new cartList based on what is in cart
function createTableList()
{	
	// Resets cartList
	cartList = [];
    count = [];
    
    //get cart from local storage
    let cart = localStorage.getItem("cart"); 
    
    //check if cart exists
    if(cart == null){
        //do nothing
    }
    else if(cart == []){
        console.log("cart is empty");
        clearCart(); //delete the cart
    }
    else{
        // split contents of cart local storage into 1d array
        let a=cart.split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {
            a[z] = a[z].split('$$$');
            count[z] = a[z][1]; //count
            
            //grab book from 2d array and push it to cartList
            let book1 = StringToBook(a[z][0]);
            cartList.push(book1);
        }
        
    }
	printCartTable();
}

function calcTotal()
{
    var totalprice = 0;
    for(let i = 0; i<cartList.length; i++){
        totalprice += (cartList[i].price * count[i]);
    }
    totalprice = totalprice.toFixed(2);
    console.log(totalprice);
    return totalprice;
}

function clearCart(){
    localStorage.removeItem("cart");
    createTableList(); //update table
    updateCartDisplay();
}

function incrementBookCount(clickedBook){
    var index = clickedBook.closest("tr").rowIndex-1;
    var book = cartList[index];
    if(book.stock != count[index]){
       count[index]++;
    }
    saveCart();
}

function decrementBookCount(clickedBook){
    var index = clickedBook.closest("tr").rowIndex-1;
    var book = cartList[index];
    if(count[index] > 1){
       count[index]--;;
    }
    saveCart();
}

function removeBook(clickedBook){
    var index = clickedBook.closest("tr").rowIndex-1;
    cartList.splice(index,1);
    count.splice(index,1);
    saveCart();
}

function saveCart(){
    let cart = localStorage.getItem("cart"); 
    // split contents of cart local storage into 1d array
    let a=cart.split('@@@');   
    // Change the 1 outer array into 2 dim array, update from cartList and count
    for (let z = 0; z<cartList.length;z++)
    {
        a[z] = a[z].split('$$$');
        a[z][1] = count[z]; //count
        a[z][0] = BookToString(cartList[z]);
        a[z] = a[z].join('$$$');
    }
    if(cartList.length != a.length){ //if an item was removed, cartList will be 1 item shorter than cart 
        a.splice(a.length-1,1); //Remove the extra item
    }
    a = a.join("@@@");
    localStorage.setItem("cart",a);
    createTableList(); //update table
    updateCartDisplay();
}

function loadCartPage()
{
    console.log();
    createTableList();
    calcTotal();
}

function getCartItemCount(){
    var totalCount = 0;
    let cart = localStorage.getItem("cart");
    if(cart == null || cart == []){
        return 0;
    }
    else {
        // split contents of cart local storage into 1d array
        let a=cart.split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {   
            a[z] = a[z].split('$$$');
            totalCount += parseInt(a[z][1]); //count
            console.log(totalCount);
        }
        return totalCount; 
    }
}

function updateCartDisplay(){
    let cartCountDisplay = getCartItemCount();
    document.getElementById("cartBtnCount").innerHTML = cartCountDisplay + "<i class='fa fa-shopping-cart' style=''> </i>";
}