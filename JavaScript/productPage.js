// Radoslaw Konopka
// Global productPageList
// Contains current list of books on the page
var productPageList;
// These two act like query to save user's input/choices on productPage
var saveSort;
var saveSearch

// Sends selected book from the productPageList to another page
function passInfo(clickedBook)
{
    // Save user's choices/input
    sessionStorage.setItem("saveSearch",saveSearch);
    sessionStorage.setItem("sortSearch",saveSort);
    sessionStorage.setItem("search",document.getElementById("txt1").value);
	// Changes from DOM object to string while conservating format
	let book = BookToString(productPageList[clickedBook.rowIndex-1]);
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the productPageList of given books on table
function printTable()
{
    // Creates a table for book productPageList display
	let table="<tr><th></th><th>Title</th><th>Author</th><th>Price</th><th>Rating</th><th></th></tr>";
    let i;
	// Adds all necessary info to all books that match with the search and then displays it as table
	for (i = 0; i <productPageList.length; i++) { 
		table += "<tr><td id='pic' onclick='passInfo(parentNode)';>";
		table += "<img src='/";
		table += productPageList[i].image;
		table += "'/>";
		table += "</td><td>";
		table += productPageList[i].title;
		table += "</td><td>";
        table += productPageList[i].author;
		table += "</td><td>";
        table += "$";
		table += productPageList[i].price;
		table += "</td><td>";
        if (productPageList[i].numOfReviews != 0)
            table += productPageList[i].averageRating+"/10";
        else
            table += "No Rating";
        table += "</td><td>";
		table += "<button id='view' onclick='passInfo(parentNode.parentNode)';>View</button>";
		table += "</td></tr>";
	}
	
	// Display the table
	document.getElementById("demo").innerHTML = table;  
}

// Takes the current productPageList and sorts it
function Sort(toSort)
{
    saveSort=toSort;
    // price low to high
    if (toSort == document.getElementById('lowToHigh').innerHTML)
    {
        productPageList.sort(function(a, b){return a.price - b.price});
    }
    // price high to low
    if (toSort == document.getElementById('highToLow').innerHTML)
    {
        productPageList.sort(function(a, b){return b.price - a.price});
    }
    // bestseller
    if (toSort == document.getElementById('bestseller').innerHTML)
    {
        productPageList.sort(function(a, b){return b.sold - a.sold});
    }
    // date newest to oldest
    if (toSort == document.getElementById('newest').innerHTML)
    {
        productPageList.sort(function(a, b){return b.year - a.year});
    }
    // date oldest to newest
    if (toSort == document.getElementById('oldest').innerHTML)
    {
        productPageList.sort(function(a, b){return a.year - b.year});
    }
    // Rating high to low
    if (toSort == document.getElementById('ratingHighToLow').innerHTML)
    {
        productPageList.sort(function(a, b){return b.averageRating - a.averageRating});
    }
    // Rating low to high
    if (toSort == document.getElementById('ratingLowToHigh').innerHTML)
    {
        productPageList.sort(function(a, b){return a.averageRating - b.averageRating});
    }
    // Author
    if (toSort == document.getElementById('author').innerHTML)
    {
        productPageList.sort(function(a, b)
            {
            var x = a.author;
            var y = b.author;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    // Title
    if (toSort == document.getElementById('title').innerHTML)
    {
        productPageList.sort(function(a, b)
            {
            var x = a.title;
            var y = b.title;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    printTable();
}

// Creates new productPageList based on user input | Book search
function Search(str)
{
    saveSort="";
    saveSearch=str;
	// Connects to xml file
	var x,xmlhttp,xmlDoc
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "books_catalog.xml", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 
	
	// Makes a productPageList of all books
	x = xmlDoc.getElementsByTagName("book");
	
	// Resets productPageList
	productPageList = [];
	let i,j,tempBook;
	length = x.length
	// Searches for title, author, isbn, topic, and then tags. If a book is found, then it is added to the productPageList and
	// the search goes to another book. If search does not match any case, then book is not added to the productPageList
	for (i=0; i<length; i++)
	{
        tempBook = new Book(x[i]);
        console.log(tempBook);
		// This one if then statement checks if there are no books left. If there are none, then this book will not get displayed.
		if (tempBook.stock == "0")
		{
			continue;
		}
		if (tempBook.title.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.author.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.isbn.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.topic.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		
		// Searches through entire productPageList of tags | keywords
		let tagLength = tempBook.tag.length;
		for (j=0;j<tagLength;j++)
		{
			if (tempBook.tag[j].toLowerCase().indexOf(str.toLowerCase()) != -1)
			{
				productPageList.push(tempBook);
				break;
			}
		}
	}
	printTable();
}

var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
// Will load user's input/choices if he/she came back from reviewPage
// Else it will create fresh page
function loadProductPage()
{
    console.log();
    if (sessionStorage.getItem("from")=="yes") 
    {
        // Goes back to previous state of page
        let find;
        if (sessionStorage.getItem("saveSearch") == null)
            find = "";
        else
            find = sessionStorage.getItem("saveSearch");
        Search(find);
        if (sessionStorage.getItem("sortSearch") == null)
            find = "";
        else
            find = sessionStorage.getItem("sortSearch");
        Sort(find);  
        sessionStorage.setItem("from","no")
        document.getElementById("txt1").value=sessionStorage.getItem("search");
    }
    else
        Search("");  
    
    $(document).ready(function(){
        $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      });
    });
}

