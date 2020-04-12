// Global cart List
var list;

// Sends selected book from the list to another page
function passInfo(clickedBook)
{
	// Changes from DOM object to string while conservating format
	let book = list[clickedBook.rowIndex-1].outerHTML;
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the list of given books on table
function printTable()
{
    // Creates a table for book list display
	let table="<tr><th></th><th>Title</th><th>Author</th><th>Price</th></tr>";
    let i;
	// Adds all necessary info to all books that match with the search and then displays it as table
	for (i = 0; i <list.length; i++) { 
		table += "<tr onclick='passInfo(this)' ref='a.html'><td id='pic'>";
		table += "<img src='/";
		table += list[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
		table += "'/>";
		table += "</td><td>";
		table += list[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		table += "</td><td>";
        table += list[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
		table += "</td><td>";
        table += "$";
		table += list[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
		table += "</td></tr>";
	}
	
	// Display the table
	document.getElementById("cartTable").innerHTML = table;  
}


// Creates new list based on what is in cart
function createTableList()
{	
	// Resets list
	list = [];
    
    //get cart from local storage
    let cart = localStorage.getItem("cart"); 
    
    //check if cart exists
    if(cart == null){
        //notify user that cart is empty
    }
    else{
        // split contents of cart local storage into 1d array
        let a=cart.split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {
            a[z] = a[z].split('$$$');
            
            //grab book from 2d array and push it to list
            let book1 = new DOMParser().parseFromString((a[z][0]), "text/xml");
            list.push(book1);
        }
    }
	printTable();
}


console.log()
createTableList();