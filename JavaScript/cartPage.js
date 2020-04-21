// Global cart List
// Daniel Pobidel
var list;
var count;
var totalprice;
updateCartDisplay();

// Sends selected book from the list to another page
function cartPassInfo(clickedBook)
{
	// Changes from JSON/Book object to string while conservating format
    var book = BookToString(list[clickedBook.closest("tr").rowIndex-1]);
    console.log(book);
    
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
    
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the list of given books on table
function printCartTable()
{
    if (list.length == 0){
        console.log("cart is empty");
        var table = "<tr><th style='text-align:center'> Your Cart is Empty </th></tr>";
        table += "<tr><td style='text-align:center'> <a href='productPage.html'>Click here to Shop now</a> </td> </tr>";
    }
    else{
       // Creates a table for book list display
	   var table="<tr><th></th><th>Title</th><th>Author</th><th>&nbsp;Price&nbsp;</th><th>Quantity</th></tr>";
       let i;
	   // Adds all necessary info to all books that match with the search and then displays it as table
	   for (i = 0; i <list.length; i++) 
       { 
		  table += "<tr><td onclick='cartPassInfo(parentNode)' ref='a.html' id='pic'>";
		  table += "<img src='/";
		  table += list[i].image;
		  table += "'/>";
          table += "</td><td>";
		  table += list[i].title;
		  table += "</td><td>";
          table += list[i].author;
          table += "</td><td>$";
		  table += list[i].price;
          table += "</td><td><button type='button' name='minusButton' onclick='editCart(this,2)'>"
          table += " - </button>";
          table += "x";
		  table += count[i];
          table += "<button class='plus-btn' type='button' name='plusButton' onclick='editCart(this,3)'>"
          table += " + </button> &nbsp;<button onclick='editCart(this,1)' id='removeBtn'>Remove</button></td></tr>";
	   }
        table += "<tr><td><button onclick='editCart(this,0)' id='clearBtn' >Clear Cart</button></td><td></td><td> Total Price: </td> <td> $"
        table += calcTotal();
        table += "</td><td><button onclick='' id='checkoutBtn'>Check Out </button></td></tr>"
    }
	
	// Display the table
	document.getElementById("cartTable").innerHTML = table;  
}


// Creates new list based on what is in cart
function createTableList()
{	
	// Resets list
	list = [];
    count = [];
    
    //get cart from local storage
    let cart = localStorage.getItem("cart"); 
    
    //check if cart exists
    if(cart == null){
        //do nothing
    }
    else if(cart == []){
        console.log("cart is empty");
        
        //delete the cart
        editCart(0,0);
    }
    else{
        // split contents of cart local storage into 1d array
        let a=cart.split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {
            a[z] = a[z].split('$$$');
            count[z] = a[z][1]; //count
            
            //grab book from 2d array and push it to list
            let book1 = StringToBook(a[z][0]);
            list.push(book1);
        }
        
    }
	printCartTable();
}

function calcTotal()
{
    var totalprice = 0;
    for(let i = 0; i<list.length; i++){
        totalprice += (list[i].price * count[i]);
    }
    totalprice = totalprice.toFixed(2);
    console.log(totalprice);
    return totalprice;
}


function editCart(clickedItem,changeCode){
    // 0 - delete/clear cart
    // 1 - remove book
    // 2 - decrease quantity
    // 3 - increase quantity
    
    if(changeCode == 0){
        console.log("clear cart");
        localStorage.removeItem("cart");
    }
    else
    {
        var book = list[clickedItem.closest("tr").rowIndex-1]
        //get cart from local storage
        let cart = localStorage.getItem("cart");
        // split contents of cart local storage into 1d array
        let a=cart.split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {   
            a[z] = a[z].split('$$$');
            count[z] = a[z][1]; //count
            
            let book_isbn = book.isbn; //selected book
            let cart_book = StringToBook(a[z][0]); //book in saved cart
            let cart_book_isbn = cart_book.isbn;  //saved cart book isbn
            
            if ( cart_book_isbn === book_isbn)  //find selected book in cart
            { 
                if(changeCode==1) //remove book
                {
                    a[z] = a[z].join('$$$');
                    a.splice(z, 1); //remove 1 item at index a[z]
                    
                }
                else if(changeCode==2) //decrease quantity
                {
                    if(a[z][1] > 1) //prevent quantity from going below 1
                    {
                        a[z][1]--;
                    }
                    a[z] = a[z].join('$$$');
                }   
                else if(changeCode==3) //increase quantity
                {
                    let stock = cart_book.stock;
                    console.log("stock:", stock);
                    if(a[z][1] < parseInt(stock))//check stock
                    {
                        a[z][1]++;
                    }
                    a[z] = a[z].join('$$$');
                }
            }
            else{
                a[z] = a[z].join('$$$');
            }
        }
        
        a=a.join("@@@");
        localStorage.setItem("cart",a);
        
    }     
    createTableList(); //update table
    updateCartDisplay();
}

function loadCartPage()
{
    console.log();
    createTableList();
    calcTotal();
}

function getCartCount(){
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
    let cartCountDisplay = getCartCount();
    document.getElementById("cartBtnCount").innerHTML = cartCountDisplay + "<i class='fa fa-shopping-cart' style=''> </i>";
}